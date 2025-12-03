import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'grg-file-list',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'list',
	},
	template: `<ng-content />`,
})
export class GrgFileList {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('flex flex-col gap-2 mt-4', this.userClass()),
	);
}
