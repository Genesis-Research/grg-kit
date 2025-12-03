import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const stepLabelVariants = cva('font-medium transition-colors', {
	variants: {
		state: {
			inactive: 'text-muted-foreground',
			active: 'text-foreground',
			completed: 'text-foreground',
		},
		size: {
			sm: 'text-xs',
			md: 'text-sm',
			lg: 'text-base',
		},
	},
	defaultVariants: {
		state: 'inactive',
		size: 'md',
	},
});

export type StepLabelVariants = VariantProps<typeof stepLabelVariants>;

@Directive({
	selector: '[grgStepLabel]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
	},
})
export class GrgStepLabel {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly state = input<'inactive' | 'active' | 'completed'>('inactive');
	public readonly size = input<'sm' | 'md' | 'lg'>('md');

	protected readonly _computedClass = computed(() =>
		hlm(stepLabelVariants({ state: this.state(), size: this.size() }), this.userClass()),
	);
}
