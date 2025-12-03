import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

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
