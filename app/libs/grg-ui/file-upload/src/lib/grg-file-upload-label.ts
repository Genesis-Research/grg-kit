import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'grg-file-upload-label, [grgFileUploadLabel]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadLabel {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-sm font-medium text-foreground', this.userClass()),
	);
}
