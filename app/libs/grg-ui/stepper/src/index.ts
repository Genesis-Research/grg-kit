import { GrgStep } from './lib/grg-step';
import { GrgStepContent } from './lib/grg-step-content';
import { GrgStepDescription } from './lib/grg-step-description';
import { GrgStepIndicator } from './lib/grg-step-indicator';
import { GrgStepLabel } from './lib/grg-step-label';
import { GrgStepSeparator } from './lib/grg-step-separator';
import { GrgStepper } from './lib/grg-stepper';

export * from './lib/grg-step';
export * from './lib/grg-step-content';
export * from './lib/grg-step-description';
export * from './lib/grg-step-indicator';
export * from './lib/grg-step-label';
export * from './lib/grg-step-separator';
export * from './lib/grg-stepper';

export const GrgStepperImports = [
	GrgStepper,
	GrgStep,
	GrgStepIndicator,
	GrgStepLabel,
	GrgStepDescription,
	GrgStepSeparator,
	GrgStepContent,
] as const;
