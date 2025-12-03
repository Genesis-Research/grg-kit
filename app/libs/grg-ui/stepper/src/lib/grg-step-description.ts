import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[grgStepDescription]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class GrgStepDescription {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-xs text-muted-foreground', this.userClass()),
	);
}
