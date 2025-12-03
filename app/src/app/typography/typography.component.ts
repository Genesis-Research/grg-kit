import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [HlmCardImports, HlmTypographyImports],
  template: `
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Font Families -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Font Families</h3>
          <p hlmCardDescription>Available typefaces in the design system</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <p class="font-sans">Sans: The quick brown fox jumps over the lazy dog</p>
          <p class="font-serif">Serif: The quick brown fox jumps over the lazy dog</p>
          <p class="font-mono">Mono: The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      <!-- Display Headings -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Display Headings</h3>
          <p hlmCardDescription>H1 through H4 for page and section titles</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <h1 hlmH1 class="border-none">Heading 1</h1>
          <h2 hlmH2>Heading 2</h2>
          <h3 hlmH3>Heading 3</h3>
          <h4 hlmH4>Heading 4</h4>
        </div>
      </section>

      <!-- Text Sizes -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Text Sizes</h3>
          <p hlmCardDescription>Small, default, and large text variants</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <p hlmSmall>Small text for captions and fine print</p>
          <p hlmP>Default paragraph text for body content</p>
          <p hlmLarge>Large text for emphasis and highlights</p>
        </div>
      </section>

      <!-- Muted & Lead Text -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Muted & Lead</h3>
          <p hlmCardDescription>Secondary and introductory text styles</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <p hlmMuted>Muted text for secondary information and hints</p>
          <p hlmLead>Lead text for introductions and summaries</p>
        </div>
      </section>

      <!-- Combined Usage -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Combined Usage</h3>
          <p hlmCardDescription>Common text patterns in context</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div>
            <p hlmLarge>Account Settings</p>
            <p hlmMuted>Manage your account preferences and security</p>
          </div>
          <div>
            <p hlmSmall class="text-muted-foreground uppercase tracking-wide">Status</p>
            <p hlmP>Active subscription</p>
          </div>
          <div>
            <p hlmP>Last updated <span class="text-muted-foreground">3 days ago</span></p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class TypographyComponent {}
