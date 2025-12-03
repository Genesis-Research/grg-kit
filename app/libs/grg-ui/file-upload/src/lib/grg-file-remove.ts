import { Component, computed, input, output } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'button[grgFileRemove]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		type: 'button',
		'(click)': 'onClick($event)',
	},
	template: `<ng-content />`,
})
export class GrgFileRemove {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly remove = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm(
			'shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors',
			this.userClass(),
		),
	);

	onClick(event: Event): void {
		event.stopPropagation();
		this.remove.emit();
	}
}
