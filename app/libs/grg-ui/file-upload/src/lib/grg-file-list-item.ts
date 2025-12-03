import { Component, computed, input, output } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'grg-file-list-item',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'listitem',
	},
	template: `<ng-content />`,
})
export class GrgFileListItem {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly file = input<File>();

	public readonly remove = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm(
			'flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground',
			this.userClass(),
		),
	);

	onRemove(): void {
		this.remove.emit();
	}
}
