import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const stepSeparatorVariants = cva('transition-colors', {
	variants: {
		orientation: {
			horizontal: 'h-0.5 flex-1',
			vertical: 'w-0.5 min-h-8',
		},
		state: {
			inactive: 'bg-muted-foreground/30',
			active: 'bg-muted-foreground/30',
			completed: 'bg-primary',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
		state: 'inactive',
	},
});

export type StepSeparatorVariants = VariantProps<typeof stepSeparatorVariants>;

@Directive({
	selector: '[grgStepSeparator]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
		'[attr.data-orientation]': 'orientation()',
	},
})
export class GrgStepSeparator {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly state = input<'inactive' | 'active' | 'completed'>('inactive');

	protected readonly _computedClass = computed(() =>
		hlm(
			stepSeparatorVariants({ orientation: this.orientation(), state: this.state() }),
			this.userClass(),
		),
	);
}
