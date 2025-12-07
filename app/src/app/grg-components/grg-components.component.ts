import { Component, signal, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideChevronDown,
	lucideChevronRight,
	lucideCode,
	lucideEye,
	lucideCheck,
	lucideBlocks,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { CodeBlockComponent } from '../blocks/shared/code-block.component';
import { StepperHorizontalBlockComponent } from './stepper/stepper-horizontal-block.component';
import { StepperVerticalBlockComponent } from './stepper/stepper-vertical-block.component';
import { FileUploadBlockComponent } from './file-upload/file-upload-block.component';
import { blockSourceMap } from './generated-sources';

interface BlockItem {
	id: string;
	title: string;
	description: string;
}

interface BlockCategory {
	id: string;
	title: string;
	icon: string;
	expanded: boolean;
	items: BlockItem[];
}

@Component({
	selector: 'app-grg-components',
	standalone: true,
	imports: [
		NgIcon,
		HlmIcon,
		HlmButtonImports,
		HlmSidebarImports,
		CodeBlockComponent,
		StepperHorizontalBlockComponent,
		StepperVerticalBlockComponent,
		FileUploadBlockComponent,
	],
	viewProviders: [
		provideIcons({
			lucideChevronDown,
			lucideChevronRight,
			lucideCode,
			lucideEye,
			lucideCheck,
			lucideBlocks,
		}),
	],
	template: `
		<div hlmSidebarWrapper class="min-h-[calc(100vh-8rem)]">
			<!-- Sidebar -->
			<hlm-sidebar collapsible="none" class="border-r">
				<div hlmSidebarHeader class="p-4">
					<h2 class="text-lg font-semibold">Blocks</h2>
					<p class="text-sm text-muted-foreground">Custom components</p>
				</div>
				<div hlmSidebarContent>
					<div hlmSidebarGroup>
						<div hlmSidebarGroupContent>
							<ul hlmSidebarMenu>
								@for (category of categories; track category.id) {
									<li hlmSidebarMenuItem>
										<button
											hlmSidebarMenuButton
											class="justify-between"
											(click)="toggleCategory(category.id)"
										>
											<span class="flex items-center gap-2">
												<ng-icon hlm [name]="category.icon" size="sm" />
												{{ category.title }}
											</span>
											<ng-icon
												hlm
												[name]="category.expanded ? 'lucideChevronDown' : 'lucideChevronRight'"
												size="sm"
												class="text-muted-foreground"
											/>
										</button>
										@if (category.expanded) {
											<ul class="ml-4 mt-1 space-y-1 border-l pl-4">
												@for (item of category.items; track item.id) {
													<li>
														<button
															class="w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors"
															[class]="
																activeBlock() === item.id
																	? 'bg-accent text-accent-foreground font-medium'
																	: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
															"
															(click)="selectBlock(item.id)"
														>
															{{ item.title }}
														</button>
													</li>
												}
											</ul>
										}
									</li>
								}
							</ul>
						</div>
					</div>
				</div>
			</hlm-sidebar>

			<!-- Main Content -->
			<main hlmSidebarInset class="flex flex-col h-[calc(100vh-8rem)]">
				<!-- Header Bar -->
				<div class="flex items-center justify-between px-6 py-3 border-b bg-muted/30">
					<div>
						<h2 class="text-lg font-semibold">{{ currentBlockTitle() }}</h2>
						<p class="text-sm text-muted-foreground">{{ currentBlockDescription() }}</p>
					</div>
					<div class="flex items-center gap-2">
						<div class="flex rounded-lg border p-1">
							<button
								hlmBtn
								[variant]="showCode() ? 'ghost' : 'secondary'"
								size="sm"
								(click)="showCode.set(false)"
							>
								<ng-icon hlm name="lucideEye" size="sm" class="mr-1" />
								Preview
							</button>
							<button
								hlmBtn
								[variant]="showCode() ? 'secondary' : 'ghost'"
								size="sm"
								(click)="showCode.set(true)"
							>
								<ng-icon hlm name="lucideCode" size="sm" class="mr-1" />
								Code
							</button>
						</div>
					</div>
				</div>

				<!-- Block Preview or Code -->
				<div class="flex-1 overflow-auto p-6" [class]="showCode() ? '' : 'bg-muted/20'">
					@if (showCode()) {
						<app-code-block [code]="currentSourceCode()" class="block h-full" />
					} @else {
						<div class="flex items-center justify-center min-h-full">
							@switch (activeBlock()) {
								@case ('stepper-horizontal') {
									<app-stepper-horizontal-block />
								}
								@case ('stepper-vertical') {
									<app-stepper-vertical-block />
								}
								@case ('file-upload') {
									<app-file-upload-block />
								}
							}
						</div>
					}
				</div>
			</main>
		</div>
	`,
})
export class GrgComponentsComponent {
	activeBlock = signal('stepper-horizontal');
	showCode = signal(false);

	sourceCodeMap = blockSourceMap;

	categories: BlockCategory[] = [
		{
			id: 'navigation',
			title: 'Navigation',
			icon: 'lucideBlocks',
			expanded: true,
			items: [
				{
					id: 'stepper-horizontal',
					title: 'Stepper (Horizontal)',
					description: 'Multi-step wizard with horizontal layout',
				},
				{
					id: 'stepper-vertical',
					title: 'Stepper (Vertical)',
					description: 'Multi-step wizard with vertical layout',
				},
			],
		},
		{
			id: 'forms',
			title: 'Forms',
			icon: 'lucideBlocks',
			expanded: true,
			items: [
				{
					id: 'file-upload',
					title: 'File Upload',
					description: 'Drag and drop file upload with validation',
				},
			],
		},
	];

	currentBlockTitle = computed(() => {
		for (const category of this.categories) {
			const item = category.items.find((i) => i.id === this.activeBlock());
			if (item) return item.title;
		}
		return '';
	});

	currentBlockDescription = computed(() => {
		for (const category of this.categories) {
			const item = category.items.find((i) => i.id === this.activeBlock());
			if (item) return item.description;
		}
		return '';
	});

	currentSourceCode = computed(() => {
		return this.sourceCodeMap[this.activeBlock()] || '// Source code not available';
	});

	toggleCategory(categoryId: string) {
		const category = this.categories.find((c) => c.id === categoryId);
		if (category) {
			category.expanded = !category.expanded;
		}
	}

	selectBlock(blockId: string) {
		this.activeBlock.set(blockId);
	}
}
