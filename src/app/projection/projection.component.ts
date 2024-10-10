import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { ProjectionService } from '../services/projection.service';
import { Projection } from '../models/projection';
import { ProjectionCardComponent } from '../components/projection-card/projection-card.component';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, ProjectionCardComponent],
  templateUrl: './projection.component.html',
})
export class ProjectionComponent implements OnInit {
  projections: Projection[] = [];
  filteredProjections: Projection[] = [];

  searchInput: string = '';
  selectedGenre: string = '';
  selectedDuration: string = '';
  selectedPrice: string = '';

  constructor(private projectionService: ProjectionService) {}

  ngOnInit() {
    this.getProjections();
  }

  getProjections() {
    this.projectionService.getAllProjections().subscribe((data) => {
      this.projections = data;
      this.filteredProjections = data;
    });
  }

  filterProjections() {
    const searchInputLowerCase = this.searchInput.toLowerCase();

    this.filteredProjections = this.projections.filter(
      (projection) =>
        (projection.movie.name.toLowerCase().includes(searchInputLowerCase) ||
          projection.movie.genre
            .toLowerCase()
            .includes(searchInputLowerCase)) &&
        (this.selectedGenre
          ? projection.movie.genre === this.selectedGenre
          : true) &&
        this.filterByDuration(projection.movie.duration) &&
        this.filterByPrice(projection.price)
    );
  }

  filterByDuration(duration: number): boolean {
    if (this.selectedDuration === 'short') {
      return duration < 100;
    } else if (this.selectedDuration === 'medium') {
      return duration >= 100 && duration <= 120;
    } else if (this.selectedDuration === 'long') {
      return duration > 120;
    }
    return true;
  }

  filterByPrice(price: number): boolean {
    if (this.selectedPrice === 'cheap') {
      return price < 5;
    } else if (this.selectedPrice === 'medium') {
      return price >= 5 && price < 10;
    } else if (this.selectedPrice === 'expensive') {
      return price >= 10;
    }
    return true;
  }

  clearFilter() {
    this.searchInput = '';
    this.selectedGenre = '';
    this.selectedDuration = '';
    this.selectedPrice = '';
    this.filterProjections();
  }
}
