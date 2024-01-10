import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Destination } from '../destination';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-destinations-delete-form',
  templateUrl: './destinations-delete-form.component.html',
  styleUrls: ['./destinations-delete-form.component.css']
})
export class DestinationsDeleteFormComponent {
  @Input() destination?: Destination;
  @Output() destinationDeleted = new EventEmitter<Destination>();

  onDelete(): void {
    if (this.destination) {
      // Emitir evento para o componente pai
      this.destinationDeleted.emit(this.destination);
    }
  }
}
