import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[grgStepContent]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'tabpanel',
	},
})
export class GrgStepContent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('mt-4', this.userClass()),
	);
}
