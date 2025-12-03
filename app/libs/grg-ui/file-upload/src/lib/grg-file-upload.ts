import {
	Component,
	computed,
	ElementRef,
	input,
	model,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export interface FileValidationError {
	file: File;
	type: 'size' | 'type';
	message: string;
}

export interface GrgFileUploadConfig {
	maxFileSize?: number; // in bytes
	maxFiles?: number;
	acceptedTypes?: string[]; // e.g., ['image/*', 'application/pdf']
}

export const fileUploadVariants = cva(
	'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
	{
		variants: {
			state: {
				idle: 'border-muted-foreground/25 hover:border-muted-foreground/50 bg-muted/20',
				dragover: 'border-primary bg-primary/5',
				error: 'border-destructive bg-destructive/5',
				disabled: 'border-muted-foreground/10 bg-muted/10 cursor-not-allowed opacity-50',
			},
			size: {
				sm: 'p-4 min-h-[120px]',
				md: 'p-6 min-h-[160px]',
				lg: 'p-8 min-h-[200px]',
			},
		},
		defaultVariants: {
			state: 'idle',
			size: 'md',
		},
	},
);

export type FileUploadVariants = VariantProps<typeof fileUploadVariants>;
export type FileUploadSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'grg-file-upload',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'(dragover)': 'onDragOver($event)',
		'(dragleave)': 'onDragLeave($event)',
		'(drop)': 'onDrop($event)',
		'(click)': 'openFileDialog()',
	},
	template: `
		<input
			#fileInput
			type="file"
			class="hidden"
			[accept]="acceptedTypesString()"
			[multiple]="multiple()"
			[disabled]="disabled()"
			(change)="onFileSelect($event)"
		/>
		<ng-content />
	`,
})
export class GrgFileUpload {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly size = input<FileUploadSize>('md');
	public readonly disabled = input<boolean>(false);
	public readonly multiple = input<boolean>(true);
	public readonly maxFileSize = input<number>(10 * 1024 * 1024); // 10MB default
	public readonly maxFiles = input<number>(10);
	public readonly acceptedTypes = input<string[]>([]);

	public readonly files = model<File[]>([]);
	public readonly filesChange = output<File[]>();
	public readonly validationError = output<FileValidationError>();
	public readonly fileRemoved = output<File>();

	protected readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
	protected readonly isDragOver = signal(false);
	protected readonly hasError = signal(false);

	protected readonly acceptedTypesString = computed(() => this.acceptedTypes().join(','));

	protected readonly _state = computed(() => {
		if (this.disabled()) return 'disabled';
		if (this.hasError()) return 'error';
		if (this.isDragOver()) return 'dragover';
		return 'idle';
	});

	protected readonly _computedClass = computed(() =>
		hlm(
			fileUploadVariants({
				state: this._state(),
				size: this.size(),
			}),
			this.userClass(),
		),
	);

	openFileDialog(): void {
		if (this.disabled()) return;
		this.fileInput()?.nativeElement.click();
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		if (this.disabled()) return;
		this.isDragOver.set(true);
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver.set(false);
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver.set(false);

		if (this.disabled()) return;

		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles) {
			this.processFiles(Array.from(droppedFiles));
		}
	}

	onFileSelect(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			this.processFiles(Array.from(input.files));
		}
		// Reset input so same file can be selected again
		input.value = '';
	}

	private processFiles(newFiles: File[]): void {
		const currentFiles = this.files();
		const validFiles: File[] = [];

		for (const file of newFiles) {
			// Check max files limit
			if (currentFiles.length + validFiles.length >= this.maxFiles()) {
				break;
			}

			// Validate file size
			if (file.size > this.maxFileSize()) {
				this.hasError.set(true);
				this.validationError.emit({
					file,
					type: 'size',
					message: `File "${file.name}" exceeds maximum size of ${this.formatFileSize(this.maxFileSize())}`,
				});
				setTimeout(() => this.hasError.set(false), 2000);
				continue;
			}

			// Validate file type
			if (!this.isValidFileType(file)) {
				this.hasError.set(true);
				this.validationError.emit({
					file,
					type: 'type',
					message: `File "${file.name}" is not an accepted file type`,
				});
				setTimeout(() => this.hasError.set(false), 2000);
				continue;
			}

			// Check for duplicates
			const isDuplicate = currentFiles.some(
				(f) => f.name === file.name && f.size === file.size,
			);
			if (!isDuplicate) {
				validFiles.push(file);
			}
		}

		if (validFiles.length > 0) {
			const updatedFiles = [...currentFiles, ...validFiles];
			this.files.set(updatedFiles);
			this.filesChange.emit(updatedFiles);
		}
	}

	private isValidFileType(file: File): boolean {
		const accepted = this.acceptedTypes();
		if (accepted.length === 0) return true;

		return accepted.some((type) => {
			if (type.endsWith('/*')) {
				// Wildcard type like 'image/*'
				const category = type.slice(0, -2);
				return file.type.startsWith(category);
			}
			// Exact type match or extension
			if (type.startsWith('.')) {
				return file.name.toLowerCase().endsWith(type.toLowerCase());
			}
			return file.type === type;
		});
	}

	removeFile(file: File): void {
		const updatedFiles = this.files().filter((f) => f !== file);
		this.files.set(updatedFiles);
		this.filesChange.emit(updatedFiles);
		this.fileRemoved.emit(file);
	}

	clearFiles(): void {
		this.files.set([]);
		this.filesChange.emit([]);
	}

	private formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
}
