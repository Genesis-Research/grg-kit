/**
 * FileUpload Component
 *
 * A flexible file upload component for Angular applications.
 *
 * Copy this file to your project and customize as needed.
 *
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - class-variance-authority (styling variants)
 * - clsx (class utilities)
 *
 * Usage:
 * 1. Copy this file to your project (e.g., libs/ui/file-upload/)
 * 2. Add path mapping in tsconfig.json:
 *    "@grg-kit/ui/file-upload": ["./libs/ui/file-upload/file-upload.component.ts"]
 * 3. Import GrgFileUploadImports in your component
 */

import {
	Component,
	ElementRef,
	Pipe,
	PipeTransform,
	computed,
	input,
	model,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ClassValue } from 'clsx';

export const fileIconVariants = cva(
	'flex items-center justify-center rounded-md shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-muted text-muted-foreground',
				image: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
				document: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
				video: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
				audio: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
				archive: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
			},
			size: {
				sm: 'h-8 w-8',
				md: 'h-10 w-10',
				lg: 'h-12 w-12',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

export type FileIconVariants = VariantProps<typeof fileIconVariants>;
export type FileIconVariant = 'default' | 'image' | 'document' | 'video' | 'audio' | 'archive';

@Component({
	selector: 'grg-file-icon',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileIcon {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly variant = input<FileIconVariant>('default');
	public readonly size = input<'sm' | 'md' | 'lg'>('md');

	protected readonly _computedClass = computed(() =>
		hlm(
			fileIconVariants({
				variant: this.variant(),
				size: this.size(),
			}),
			this.userClass(),
		),
	);

	static getVariantFromMimeType(mimeType: string): FileIconVariant {
		if (mimeType.startsWith('image/')) return 'image';
		if (mimeType.startsWith('video/')) return 'video';
		if (mimeType.startsWith('audio/')) return 'audio';
		if (
			mimeType.includes('pdf') ||
			mimeType.includes('document') ||
			mimeType.includes('text')
		) {
			return 'document';
		}
		if (
			mimeType.includes('zip') ||
			mimeType.includes('rar') ||
			mimeType.includes('tar') ||
			mimeType.includes('gzip')
		) {
			return 'archive';
		}
		return 'default';
	}
}

@Component({
	selector: 'grg-file-info',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileInfo {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('flex-1 min-w-0', this.userClass()),
	);
}

@Component({
	selector: 'grg-file-list-item',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'listitem',
	},
	template: `<ng-content />`,
})
export class GrgFileListItem {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly file = input<File>();

	public readonly remove = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm(
			'flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground',
			this.userClass(),
		),
	);

	onRemove(): void {
		this.remove.emit();
	}
}

@Component({
	selector: 'grg-file-list',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'list',
	},
	template: `<ng-content />`,
})
export class GrgFileList {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('flex flex-col gap-2 mt-4', this.userClass()),
	);
}

@Component({
	selector: 'grg-file-name, [grgFileName]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileName {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-sm font-medium truncate', this.userClass()),
	);
}

@Component({
	selector: 'button[grgFileRemove]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		type: 'button',
		'(click)': 'onClick($event)',
	},
	template: `<ng-content />`,
})
export class GrgFileRemove {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly remove = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm(
			'shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors',
			this.userClass(),
		),
	);

	onClick(event: Event): void {
		event.stopPropagation();
		this.remove.emit();
	}
}

@Pipe({
	name: 'fileSize',
	standalone: true,
})
export class FileSizePipe implements PipeTransform {
	transform(bytes: number | undefined): string {
		if (bytes === undefined || bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
}

@Component({
	selector: 'grg-file-size, [grgFileSize]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileSize {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-xs text-muted-foreground', this.userClass()),
	);
}

@Component({
	selector: 'grg-file-upload-description, [grgFileUploadDescription]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadDescription {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-xs text-muted-foreground', this.userClass()),
	);
}

export const fileUploadIconVariants = cva(
	'flex items-center justify-center rounded-full',
	{
		variants: {
			variant: {
				default: 'bg-muted text-muted-foreground',
				primary: 'bg-primary/10 text-primary',
			},
			size: {
				sm: 'h-10 w-10',
				md: 'h-12 w-12',
				lg: 'h-14 w-14',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

export type FileUploadIconVariants = VariantProps<typeof fileUploadIconVariants>;

@Component({
	selector: 'grg-file-upload-icon',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadIcon {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly variant = input<'default' | 'primary'>('default');
	public readonly size = input<'sm' | 'md' | 'lg'>('md');

	protected readonly _computedClass = computed(() =>
		hlm(
			fileUploadIconVariants({
				variant: this.variant(),
				size: this.size(),
			}),
			this.userClass(),
		),
	);
}

@Component({
	selector: 'grg-file-upload-label, [grgFileUploadLabel]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadLabel {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-sm font-medium text-foreground', this.userClass()),
	);
}

@Component({
	selector: 'grg-file-upload-trigger, [grgFileUploadTrigger]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadTrigger {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm(
			'flex flex-col items-center justify-center gap-2 text-center cursor-pointer',
			this.userClass(),
		),
	);
}

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

export const GrgFileUploadImports = [
	GrgFileUpload,
	GrgFileUploadTrigger,
	GrgFileUploadIcon,
	GrgFileUploadLabel,
	GrgFileUploadDescription,
	GrgFileList,
	GrgFileListItem,
	GrgFileIcon,
	GrgFileInfo,
	GrgFileName,
	GrgFileSize,
	GrgFileRemove,
	FileSizePipe,
] as const;