import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Reservations } from '../reservations';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../reservations.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservations-details.component.html',
  styleUrls: ['./reservations-details.component.css']
})
export class ReservationsDetailsComponent {
  @Input() selectedReservation?: Reservations;
  @Output() reservationsEdited = new EventEmitter<Reservations>();
  @Output() reservationsDeleted = new EventEmitter<Reservations>();
  editingMode: boolean = false;


  showEditForm = false;
  showDeleteConfirmation = false;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private reservationsService: ReservationsService,
      private location: Location
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const res_clientId = params.get('res_clientId');
      console.log('Received res_clientId parameter:', res_clientId);
      if (res_clientId && this.selectedReservation === null) {
        this.reservationsService.getReservationsByClient(res_clientId)
          .subscribe(
            (data: Reservations[]) => {
              console.log('Received reservations data from backend:', data);
              this.selectedReservation = data[0];
              console.log("Reserva selecionada" + this.selectedReservation);
            },
            error => {
              console.error('Error fetching reservation details:', error);
            }
          );
      }
    });
  }

  onEdit(): void {
    this.editingMode = true;
  }

  onDelete(): void {
    if (this.selectedReservation) {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta reserva?');
    
    if (confirmDelete) {
      this.reservationsService.deleteReservations(this.selectedReservation).subscribe(
        () => {
          console.log('Reserva excluído com sucesso.');
          this.router.navigate(['/reservations']);
        },
        (error) => {
          console.error('Erro ao excluir a reserva:', error);
        });
      }
    }
  }
}

