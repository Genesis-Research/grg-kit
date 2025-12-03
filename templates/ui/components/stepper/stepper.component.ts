/**
 * Stepper Component
 *
 * A flexible stepper component for Angular applications.
 *
 * Copy this file to your project and customize as needed.
 *
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - class-variance-authority (styling variants)
 * - clsx (class utilities)
 *
 * Usage:
 * 1. Copy this file to your project (e.g., libs/ui/stepper/)
 * 2. Add path mapping in tsconfig.json:
 *    "@grg-kit/ui/stepper": ["./libs/ui/stepper/stepper.component.ts"]
 * 3. Import GrgStepperImports in your component
 */

import {
	Component,
	Directive,
	computed,
	contentChildren,
	inject,
	input,
	model,
	output,
	type Signal,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type ClassValue } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';
import { GrgStep } from './grg-step';

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

export const stepIndicatorVariants = cva(
	'flex items-center justify-center rounded-full border-2 font-medium transition-colors',
	{
		variants: {
			size: {
				sm: 'h-6 w-6 text-xs',
				md: 'h-8 w-8 text-sm',
				lg: 'h-10 w-10 text-base',
			},
			state: {
				inactive: 'border-muted-foreground/30 bg-background text-muted-foreground',
				active: 'border-primary bg-primary text-primary-foreground',
				completed: 'border-primary bg-primary text-primary-foreground',
			},
		},
		defaultVariants: {
			size: 'md',
			state: 'inactive',
		},
	},
);

export type StepIndicatorVariants = VariantProps<typeof stepIndicatorVariants>;
export type StepIndicatorState = 'inactive' | 'active' | 'completed';
export type StepIndicatorSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'grg-step-indicator',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
	},
	template: `<ng-content />`,
})
export class GrgStepIndicator {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly size = input<StepIndicatorSize>('md');
	public readonly state = input<StepIndicatorState>('inactive');

	protected readonly _computedClass = computed(() =>
		hlm(stepIndicatorVariants({ size: this.size(), state: this.state() }), this.userClass()),
	);
}

export const stepLabelVariants = cva('font-medium transition-colors', {
	variants: {
		state: {
			inactive: 'text-muted-foreground',
			active: 'text-foreground',
			completed: 'text-foreground',
		},
		size: {
			sm: 'text-xs',
			md: 'text-sm',
			lg: 'text-base',
		},
	},
	defaultVariants: {
		state: 'inactive',
		size: 'md',
	},
});

export type StepLabelVariants = VariantProps<typeof stepLabelVariants>;

@Directive({
	selector: '[grgStepLabel]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
	},
})
export class GrgStepLabel {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly state = input<'inactive' | 'active' | 'completed'>('inactive');
	public readonly size = input<'sm' | 'md' | 'lg'>('md');

	protected readonly _computedClass = computed(() =>
		hlm(stepLabelVariants({ state: this.state(), size: this.size() }), this.userClass()),
	);
}

export const stepSeparatorVariants = cva('transition-colors', {
	variants: {
		orientation: {
			horizontal: 'h-0.5 flex-1',
			vertical: 'w-0.5 min-h-8',
		},
		state: {
			inactive: 'bg-muted-foreground/30',
			active: 'bg-muted-foreground/30',
			completed: 'bg-primary',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
		state: 'inactive',
	},
});

export type StepSeparatorVariants = VariantProps<typeof stepSeparatorVariants>;

@Directive({
	selector: '[grgStepSeparator]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'state()',
		'[attr.data-orientation]': 'orientation()',
	},
})
export class GrgStepSeparator {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly state = input<'inactive' | 'active' | 'completed'>('inactive');

	protected readonly _computedClass = computed(() =>
		hlm(
			stepSeparatorVariants({ orientation: this.orientation(), state: this.state() }),
			this.userClass(),
		),
	);
}

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

export const GrgStepperImports = [
	GrgStepper,
	GrgStep,
	GrgStepIndicator,
	GrgStepLabel,
	GrgStepDescription,
	GrgStepSeparator,
	GrgStepContent,
] as const;