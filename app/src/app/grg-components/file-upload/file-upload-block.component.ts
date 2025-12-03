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
	GrgFileIcon,
	type FileValidationError,
	FileSizePipe,
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
				<grg-file-upload-trigger>
					<grg-file-upload-icon variant="primary">
						<ng-icon hlm name="lucideUploadCloud" size="lg" />
					</grg-file-upload-icon>
					<grg-file-upload-label>
						<span class="text-primary font-semibold">Click to upload</span> or drag and drop
					</grg-file-upload-label>
					<grg-file-upload-description>
						PNG, JPG, PDF up to 5MB (max 5 files)
					</grg-file-upload-description>
				</grg-file-upload-trigger>
			</grg-file-upload>

			@if (errorMessage()) {
				<div class="text-sm text-destructive bg-destructive/10 rounded-md p-3">
					{{ errorMessage() }}
				</div>
			}

			@if (files().length > 0) {
				<grg-file-list>
					@for (file of files(); track file.name) {
						<grg-file-list-item>
							<grg-file-icon [variant]="getFileIconVariant(file.type)">
								<ng-icon hlm [name]="getFileIconName(file.type)" size="sm" />
							</grg-file-icon>
							<grg-file-info>
								<p grgFileName>{{ file.name }}</p>
								<p grgFileSize>{{ file.size | fileSize }}</p>
							</grg-file-info>
							<button grgFileRemove (remove)="removeFile(file)">
								<ng-icon hlm name="lucideX" size="sm" />
							</button>
						</grg-file-list-item>
					}
				</grg-file-list>

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
		// Placeholder for upload logic
		console.log('Uploading files:', this.files());
		alert(`Uploading ${this.files().length} file(s)...`);
	}

	getFileIconVariant(
		mimeType: string,
	): 'default' | 'image' | 'document' | 'video' | 'audio' | 'archive' {
		return GrgFileIcon.getVariantFromMimeType(mimeType);
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
