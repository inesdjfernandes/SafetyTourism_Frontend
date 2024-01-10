import { Component, OnInit } from '@angular/core';
import { Reservations } from '../reservations';
import { ReservationsService } from '../reservations.service';
import { ReservationsDTO } from '../reservationsDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  reservations: Reservations[] = [];
  selectedReservation?: Reservations | null;
  editingMode: boolean = false;

constructor (
  private reservationsService: ReservationsService,
  private router: Router,
  ) {}

ngOnInit(): void {
  this.getReservations();
  this.selectedReservation = null;
}

onSelect(reservations: Reservations): void {
  this.selectedReservation = reservations;
  this.router.navigate(['/reservation', reservations.res_clientId]);
}

  getReservations(): void {
    this.reservationsService.getReservations()
    .subscribe((data: Reservations[]) => {
      this.reservations = data;
    });
  }

  onReservationsCreated(reservationsDTO: ReservationsDTO): void {
    this.getReservations();
  }

  onReservationsEdited(newReservation: Reservations): void {
    this.getReservations();
  }

  onReservationsDeleted(): void {
    if (this.selectedReservation) {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta reserva?');
      if (confirmDelete) {
        this.reservationsService.deleteReservations(this.selectedReservation).subscribe(
          () => {
            console.log('Reserva excluída com sucesso.');
            this.getReservations();
            this.editingMode = false;
          },
          (error) => {
            console.error('Erro ao excluir a reserva:', error);
          }
        );
      }
    }
  }
}