import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { ProjectionService } from '../services/projection.service';
import { Projection } from '../models/projection';
import { ProjectionCardComponent } from '../components/projection-card/projection-card.component';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [LucideAngularModule, ProjectionCardComponent],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.css',
})
export class ProjectionComponent implements OnInit {
  projections: Projection[] = [];

  constructor(private projectionService: ProjectionService) {}

  ngOnInit() {
    this.getProjections();
  }

  getProjections() {
    this.projectionService.getAllProjections().subscribe((data) => {
      this.projections = data;
    });
  }
}
