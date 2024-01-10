import { Component, OnInit } from '@angular/core';
import { Destination } from '../destination';
import { DestinationsService } from '../destinations.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  selectedDestination?: Destination | null;
  editingMode: boolean = false;

constructor(
  private router: Router,
  private destinationService: DestinationsService) {}

  ngOnInit(): void {
    this.getDestinations();
    this.selectedDestination = null;
  }

  onSelect(destination: Destination): void {
    this.selectedDestination = destination;
    this.router.navigate(['/destination', destination.city_name]);
  }

  getDestinations(): void {
    this.destinationService.getDestinations()
      .subscribe((data: Destination[]) => {
        this.destinations = data;
      });
  }

  onDestinationCreated(newDestination: Destination): void {
    console.log('Destination created:', newDestination);
    this.getDestinations();
  }
  
  onDestinationEdit(destination: Destination): void {
    this.editingMode = true;
  }

  onDestinationDelete(destination: Destination): void {
    if (this.selectedDestination) {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este destino?');

      if (confirmDelete) {
        this.destinationService.deleteDestination(this.selectedDestination).subscribe(
          () => {
            console.log('Destino excluído com sucesso.');
            this.getDestinations();
            this.editingMode = false;
          },
          (error) => {
            console.error('Erro ao excluir o destino:', error);
          }
        );
      }
    }
  }
}
