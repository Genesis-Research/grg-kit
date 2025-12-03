import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'grg-file-upload-description, [grgFileUploadDescription]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileUploadDescription {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-xs text-muted-foreground', this.userClass()),
	);
}
