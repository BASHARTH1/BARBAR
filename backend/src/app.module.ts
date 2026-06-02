import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './modules/projects/projects.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { NewsModule } from './modules/news/news.module';
import { StatsModule } from './modules/stats/stats.module';
import { DonationsModule } from './modules/donations/donations.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    CampaignsModule,
    NewsModule,
    StatsModule,
    DonationsModule,
    ContactModule,
  ],
})
export class AppModule {}
