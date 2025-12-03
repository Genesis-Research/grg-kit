import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { GrgStepperImports } from '@grg-kit/ui/stepper';

@Component({
	selector: 'app-stepper-vertical-block',
	standalone: true,
	imports: [GrgStepperImports, HlmButtonImports, NgIcon, HlmIcon],
	providers: [provideIcons({ lucideCheck })],
	template: `
		<div class="w-full max-w-md">
			<grg-stepper [(currentStep)]="currentStep" orientation="vertical">
				@for (step of steps; track step.label; let i = $index; let last = $last) {
					<grg-step
						[label]="step.label"
						[completed]="i < currentStep()"
						[isActive]="i === currentStep()"
						orientation="vertical"
						class="relative"
					>
						<div class="flex gap-4">
							<div class="flex flex-col items-center">
								<grg-step-indicator
									[state]="i < currentStep() ? 'completed' : i === currentStep() ? 'active' : 'inactive'"
								>
									@if (i < currentStep()) {
										<ng-icon hlm name="lucideCheck" size="sm" />
									} @else {
										{{ i + 1 }}
									}
								</grg-step-indicator>
								@if (!last) {
									<div
										grgStepSeparator
										orientation="vertical"
										[state]="i < currentStep() ? 'completed' : 'inactive'"
										class="my-2"
									></div>
								}
							</div>
							<div class="pb-8">
								<span
									grgStepLabel
									[state]="i < currentStep() ? 'completed' : i === currentStep() ? 'active' : 'inactive'"
								>
									{{ step.label }}
								</span>
								<p grgStepDescription class="mt-1">{{ step.description }}</p>
								@if (i === currentStep()) {
									<div grgStepContent class="mt-4">
										<p class="text-sm text-muted-foreground mb-4">{{ step.content }}</p>
										<div class="flex gap-2">
											@if (i > 0) {
												<button hlmBtn variant="outline" size="sm" (click)="previous()">Back</button>
											}
											<button hlmBtn size="sm" (click)="next()">
												{{ last ? 'Finish' : 'Continue' }}
											</button>
										</div>
									</div>
								}
							</div>
						</div>
					</grg-step>
				}
			</grg-stepper>
		</div>
	`,
})
export class StepperVerticalBlockComponent {
	currentStep = signal(0);

	steps = [
		{
			label: 'Create account',
			description: 'Set up your new account',
			content: 'Enter your email and create a secure password.',
		},
		{
			label: 'Verify email',
			description: 'Confirm your email address',
			content: 'Check your inbox for a verification link.',
		},
		{
			label: 'Complete profile',
			description: 'Add your personal details',
			content: 'Tell us a bit about yourself.',
		},
	];

	next() {
		if (this.currentStep() < this.steps.length - 1) {
			this.currentStep.update((v) => v + 1);
		}
	}

	previous() {
		if (this.currentStep() > 0) {
			this.currentStep.update((v) => v - 1);
		}
	}
}
