import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideUploadCloud,
	lucideFile,
	lucideFileImage,
	lucideFileText,
	lucideFileVideo,
	lucideFileAudio,
	lucideFileArchive,
	lucideX,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
	GrgFileUploadImports,
	getFileIconVariant,
	type FileValidationError,
} from '@grg-kit/ui/file-upload';

@Component({
	selector: 'app-file-upload-block',
	standalone: true,
	imports: [GrgFileUploadImports, HlmButtonImports, NgIcon, HlmIcon],
	providers: [
		provideIcons({
			lucideUploadCloud,
			lucideFile,
			lucideFileImage,
			lucideFileText,
			lucideFileVideo,
			lucideFileAudio,
			lucideFileArchive,
			lucideX,
		}),
	],
	template: `
		<div class="w-full max-w-lg space-y-4">
			<grg-file-upload
				[(files)]="files"
				[maxFileSize]="maxFileSize"
				[maxFiles]="5"
				[acceptedTypes]="acceptedTypes"
				(validationError)="onValidationError($event)"
			>
				<!-- Trigger content - just use plain HTML with Tailwind -->
				<div class="flex flex-col items-center justify-center gap-2 text-center">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
						<ng-icon hlm name="lucideUploadCloud" size="lg" />
					</div>
					<p class="text-sm font-medium">
						<span class="text-primary font-semibold">Click to upload</span> or drag and drop
					</p>
					<p class="text-xs text-muted-foreground">
						PNG, JPG, PDF up to 5MB (max 5 files)
					</p>
				</div>
			</grg-file-upload>

			@if (errorMessage()) {
				<div class="text-sm text-destructive bg-destructive/10 rounded-md p-3">
					{{ errorMessage() }}
				</div>
			}

			@if (files().length > 0) {
				<!-- File list - just use plain HTML with Tailwind -->
				<div class="flex flex-col gap-2">
					@for (file of files(); track file.name) {
						<div class="flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md" [class]="getFileIconClass(file.type)">
								<ng-icon hlm [name]="getFileIconName(file.type)" size="sm" />
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium truncate">{{ file.name }}</p>
								<p class="text-xs text-muted-foreground">{{ file.size | fileSize }}</p>
							</div>
							<button
								type="button"
								class="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
								(click)="removeFile(file); $event.stopPropagation()"
							>
								<ng-icon hlm name="lucideX" size="sm" />
							</button>
						</div>
					}
				</div>

				<div class="flex gap-2">
					<button hlmBtn variant="outline" size="sm" (click)="clearFiles()">
						Clear all
					</button>
					<button hlmBtn size="sm" (click)="uploadFiles()">
						Upload {{ files().length }} file{{ files().length > 1 ? 's' : '' }}
					</button>
				</div>
			}
		</div>
	`,
})
export class FileUploadBlockComponent {
	files = signal<File[]>([]);
	errorMessage = signal<string>('');

	maxFileSize = 5 * 1024 * 1024; // 5MB
	acceptedTypes = ['image/*', 'application/pdf'];

	onValidationError(error: FileValidationError): void {
		this.errorMessage.set(error.message);
		setTimeout(() => this.errorMessage.set(''), 3000);
	}

	removeFile(file: File): void {
		this.files.update((files) => files.filter((f) => f !== file));
	}

	clearFiles(): void {
		this.files.set([]);
	}

	uploadFiles(): void {
		console.log('Uploading files:', this.files());
		alert(`Uploading ${this.files().length} file(s)...`);
	}

	getFileIconClass(mimeType: string): string {
		const variant = getFileIconVariant(mimeType);
		const classes: Record<string, string> = {
			default: 'bg-muted text-muted-foreground',
			image: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
			document: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
			video: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
			audio: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
			archive: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
		};
		return classes[variant] || classes['default'];
	}

	getFileIconName(mimeType: string): string {
		if (mimeType.startsWith('image/')) return 'lucideFileImage';
		if (mimeType.startsWith('video/')) return 'lucideFileVideo';
		if (mimeType.startsWith('audio/')) return 'lucideFileAudio';
		if (mimeType.includes('pdf') || mimeType.includes('document')) return 'lucideFileText';
		if (mimeType.includes('zip') || mimeType.includes('rar')) return 'lucideFileArchive';
		return 'lucideFile';
	}
}
