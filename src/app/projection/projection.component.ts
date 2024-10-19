import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { ProjectionService } from '../../services/projection.service';
import { Projection } from '../../models/projection';
import { ProjectionCardComponent } from '../components/projection-card/projection-card.component';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [FormsModule, NgFor, ProjectionCardComponent],
  templateUrl: './projection.component.html',
})
export class ProjectionComponent implements OnInit {
  projections: Projection[] = [];
  filteredProjections: Projection[] = [];
  isLoading: boolean = false;

  nameInput: string = '';
  descriptionInput: string = '';
  selectedGenre: string = '';
  selectedDuration: string = '';
  selectedProducer: string = '';
  selectedActor: string = '';
  selectedPrice: string = '';

  constructor(private projectionService: ProjectionService) {}

  ngOnInit() {
    this.getProjections();
  }

  getProjections() {
    this.isLoading = true;
    this.projectionService.getAllProjections().subscribe({
      next: (data) => {
        this.projections = data;
        this.filteredProjections = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterProjections() {
    const nameInputLowerCase = this.nameInput.toLowerCase();
    const descriptionInputLowerCase = this.descriptionInput.toLowerCase();

    this.filteredProjections = this.projections.filter(
      (projection) =>
        projection.movie.name.toLowerCase().includes(nameInputLowerCase) &&
        (descriptionInputLowerCase
          ? projection.movie.description
              .toLowerCase()
              .includes(descriptionInputLowerCase)
          : true) &&
        (this.selectedGenre
          ? projection.movie.genre === this.selectedGenre
          : true) &&
        (this.selectedProducer
          ? projection.movie.producer === this.selectedProducer
          : true) &&
        (this.selectedActor
          ? projection.movie.actors.some((actor) =>
              actor.includes(this.selectedActor)
            )
          : true) &&
        this.filterByDuration(projection.movie.duration) &&
        this.filterByPrice(projection.price)
    );

    if (this.filteredProjections.length === 0) {
      this.isLoading = false;
    }
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
    this.nameInput = '';
    this.descriptionInput = '';
    this.selectedGenre = '';
    this.selectedProducer = '';
    this.selectedActor = '';
    this.selectedDuration = '';
    this.selectedPrice = '';
    this.filterProjections();
  }
}
