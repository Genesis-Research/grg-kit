import {
	Component,
	computed,
	contentChildren,
	input,
	model,
	output,
	type Signal,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { GrgStep } from './grg-step';

export const stepperVariants = cva('flex w-full', {
	variants: {
		orientation: {
			horizontal: 'flex-row items-start',
			vertical: 'flex-col',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
export type StepperOrientation = 'horizontal' | 'vertical';

@Component({
	selector: 'grg-stepper',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		role: 'tablist',
		'[attr.aria-orientation]': 'orientation()',
	},
	template: `<ng-content />`,
})
export class GrgStepper {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly orientation = input<StepperOrientation>('horizontal');
	public readonly currentStep = model<number>(0);
	public readonly linear = input<boolean>(false);

	public readonly stepChange = output<number>();

	public readonly steps: Signal<readonly GrgStep[]> = contentChildren(GrgStep);

	protected readonly _computedClass = computed(() =>
		hlm(stepperVariants({ orientation: this.orientation() }), this.userClass()),
	);

	public readonly totalSteps = computed(() => this.steps().length);
	public readonly isFirstStep = computed(() => this.currentStep() === 0);
	public readonly isLastStep = computed(() => this.currentStep() === this.totalSteps() - 1);

	goToStep(index: number): void {
		const steps = this.steps();
		if (index < 0 || index >= steps.length) return;

		if (this.linear()) {
			// In linear mode, can only go to next step if current is completed
			if (index > this.currentStep()) {
				const currentStepInstance = steps[this.currentStep()];
				if (!currentStepInstance?.completed()) return;
			}
		}

		this.currentStep.set(index);
		this.stepChange.emit(index);
	}

	next(): void {
		if (!this.isLastStep()) {
			this.goToStep(this.currentStep() + 1);
		}
	}

	previous(): void {
		if (!this.isFirstStep()) {
			this.goToStep(this.currentStep() - 1);
		}
	}

	reset(): void {
		this.currentStep.set(0);
		this.stepChange.emit(0);
	}
}
