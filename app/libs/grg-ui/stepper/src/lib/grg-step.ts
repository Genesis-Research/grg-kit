import { Component, computed, inject, input, model } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const stepVariants = cva('flex gap-2', {
	variants: {
		orientation: {
			horizontal: 'flex-col items-center flex-1',
			vertical: 'flex-row items-start',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export type StepVariants = VariantProps<typeof stepVariants>;

@Component({
	selector: 'grg-step',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'tab',
		'[attr.aria-selected]': 'isActive()',
		'[attr.data-state]': 'state()',
		'[attr.data-orientation]': 'orientation()',
	},
	template: `<ng-content />`,
})
export class GrgStep {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly completed = model<boolean>(false);
	public readonly disabled = input<boolean>(false);
	public readonly optional = input<boolean>(false);
	public readonly label = input<string>('');
	public readonly description = input<string>('');
	public readonly icon = input<string>('');

	// Index will be set by parent stepper
	public readonly index = input<number>(0);
	public readonly isActive = input<boolean>(false);

	public readonly state = computed(() => {
		if (this.isActive()) return 'active';
		if (this.completed()) return 'completed';
		return 'inactive';
	});

	protected readonly _computedClass = computed(() =>
		hlm(stepVariants({ orientation: this.orientation() }), this.userClass()),
	);
}
