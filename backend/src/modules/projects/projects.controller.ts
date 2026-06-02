import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    const project = this.service.findOne(slug);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
