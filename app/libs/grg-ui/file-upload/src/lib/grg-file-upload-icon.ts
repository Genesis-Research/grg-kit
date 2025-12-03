import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

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
