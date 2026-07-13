import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero.component';
import { PresidentMessageComponent } from './sections/president-message.component';
import { IntroComponent } from './sections/intro.component';
import { DonationHubComponent } from './sections/donation-hub.component';
import { VideoSupportComponent } from './sections/video-support.component';
import { ProjectsGridComponent } from './sections/projects-grid.component';
import { NewsSectionComponent } from './sections/news-section.component';
import { SponsorsComponent } from './sections/sponsors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    PresidentMessageComponent,
    IntroComponent,
    DonationHubComponent,
    VideoSupportComponent,
    ProjectsGridComponent,
    NewsSectionComponent,
    SponsorsComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-president-message></app-president-message>
    <app-sponsors></app-sponsors>
    <app-intro></app-intro>
    <app-donation-hub></app-donation-hub>
    <app-video-support></app-video-support>
    <app-projects-grid></app-projects-grid>
    <app-news-section></app-news-section>
  `,
})
export class HomeComponent {}
