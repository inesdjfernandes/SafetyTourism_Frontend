import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Destination } from '../destination';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationsService } from '../destinations.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-destinations-details',
  templateUrl: './destinations-details.component.html',
  styleUrls: ['./destinations-details.component.css']
})
export class DestinationsDetailsComponent implements OnInit {
  @Input() selectedDestination: Destination | null = null;
  @Output() destinationEdited = new EventEmitter<Destination>();
  @Output() destinationDeleted = new EventEmitter<Destination>();

showEditForm = false;
showDeleteConfirmation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationsService: DestinationsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const destinationCity = params.get('city_name');
      console.log('Received city_name parameter:', destinationCity);
      if (destinationCity && this.selectedDestination === null) {
        this.destinationsService.getDestinationByCity(destinationCity)
          .subscribe(
            (data: Destination) => {
              console.log('Received destination data from backend:', data);
              this.selectedDestination = data;
              console.log("destino selecionado" + this.selectedDestination);
            },
            error => {
              console.error('Error fetching destination details:', error);
            }
          );
      }
    });
  }

  toggleDeleteConfirmation(): void {
    this.showDeleteConfirmation = !this.showDeleteConfirmation;
  }

  onDestinationEdited(destination: Destination): void {
    console.log('Dados do destino a serem editados:', destination);
    this.showEditForm = true;
    this.destinationEdited.emit(destination);
  }

  onDestinationDeleted(newDestination: Destination): void {
    console.log('Delete button clicked for destination:', newDestination);
  
    if (this.selectedDestination && confirm(`Você tem certeza que deseja excluir ${newDestination.city_name}?`)) {
      this.destinationsService.deleteDestination(newDestination).subscribe(
        () => {
          console.log('Destination deleted successfully.');
          this.destinationDeleted.emit(newDestination);
          this.router.navigate(['/destinations']);
        },
        error => {
          console.error('Error deleting destination:', error);
        }
      );
    }
  }

  redirectToPackages(city_name: string): void {
    if (this.selectedDestination) {
    this.router.navigate(['/package', city_name]);
    }
  }
}
