import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { GrgStepperImports } from '@grg-kit/ui/stepper';

@Component({
	selector: 'app-stepper-horizontal-block',
	standalone: true,
	imports: [GrgStepperImports, HlmButtonImports, NgIcon, HlmIcon],
	providers: [provideIcons({ lucideCheck })],
	template: `
		<div class="w-full max-w-2xl">
			<grg-stepper [(currentStep)]="currentStep" class="mb-8">
				@for (step of steps; track step.label; let i = $index) {
					<grg-step
						[label]="step.label"
						[completed]="i < currentStep()"
						[isActive]="i === currentStep()"
						class="relative"
					>
						<div class="flex flex-col items-center gap-2">
							<grg-step-indicator
								[state]="i < currentStep() ? 'completed' : i === currentStep() ? 'active' : 'inactive'"
							>
								@if (i < currentStep()) {
									<ng-icon hlm name="lucideCheck" size="sm" />
								} @else {
									{{ i + 1 }}
								}
							</grg-step-indicator>
							<span
								grgStepLabel
								[state]="i < currentStep() ? 'completed' : i === currentStep() ? 'active' : 'inactive'"
							>
								{{ step.label }}
							</span>
							<span grgStepDescription>{{ step.description }}</span>
						</div>
						@if (i < steps.length - 1) {
							<div
								grgStepSeparator
								[state]="i < currentStep() ? 'completed' : 'inactive'"
								class="absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-4"
							></div>
						}
					</grg-step>
				}
			</grg-stepper>

			<div grgStepContent class="rounded-lg border p-6">
				@switch (currentStep()) {
					@case (0) {
						<h3 class="text-lg font-semibold mb-2">Account Information</h3>
						<p class="text-muted-foreground">Enter your account details to get started.</p>
					}
					@case (1) {
						<h3 class="text-lg font-semibold mb-2">Payment Details</h3>
						<p class="text-muted-foreground">Add your payment information.</p>
					}
					@case (2) {
						<h3 class="text-lg font-semibold mb-2">Confirmation</h3>
						<p class="text-muted-foreground">Review and confirm your information.</p>
					}
				}
			</div>

			<div class="flex justify-between mt-6">
				<button hlmBtn variant="outline" [disabled]="currentStep() === 0" (click)="previous()">
					Previous
				</button>
				<button hlmBtn (click)="next()">
					{{ currentStep() === steps.length - 1 ? 'Complete' : 'Next' }}
				</button>
			</div>
		</div>
	`,
})
export class StepperHorizontalBlockComponent {
	currentStep = signal(0);

	steps = [
		{ label: 'Account', description: 'Create your account' },
		{ label: 'Payment', description: 'Add payment method' },
		{ label: 'Confirm', description: 'Review & submit' },
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
