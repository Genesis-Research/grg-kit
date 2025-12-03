import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const stepIndicatorVariants = cva(
	'flex items-center justify-center rounded-full border-2 font-medium transition-colors',
	{
		variants: {
			size: {
				sm: 'h-6 w-6 text-xs',
				md: 'h-8 w-8 text-sm',
				lg: 'h-10 w-10 text-base',
			},
			state: {
				inactive: 'border-muted-foreground/30 bg-background text-muted-foreground',
				active: 'border-primary bg-primary text-primary-foreground',
				completed: 'border-primary bg-primary text-primary-foreground',
			},
		},
		defaultVariants: {
			size: 'md',
			state: 'inactive',
		},
	},
);

export type StepIndicatorVariants = VariantProps<typeof stepIndicatorVariants>;
export type StepIndicatorState = 'inactive' | 'active' | 'completed';
export type StepIndicatorSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'grg-step-indicator',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
	},
	template: `<ng-content />`,
})
export class GrgStepIndicator {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly size = input<StepIndicatorSize>('md');
	public readonly state = input<StepIndicatorState>('inactive');

	protected readonly _computedClass = computed(() =>
		hlm(stepIndicatorVariants({ size: this.size(), state: this.state() }), this.userClass()),
	);
}
