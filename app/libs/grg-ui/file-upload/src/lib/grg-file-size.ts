import { Component, computed, input, Pipe, PipeTransform } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Pipe({
	name: 'fileSize',
	standalone: true,
})
export class FileSizePipe implements PipeTransform {
	transform(bytes: number | undefined): string {
		if (bytes === undefined || bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
}

@Component({
	selector: 'grg-file-size, [grgFileSize]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `<ng-content />`,
})
export class GrgFileSize {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm('text-xs text-muted-foreground', this.userClass()),
	);
}
