import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Destination } from '../destination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-destinations-edit-form',
  templateUrl: './destinations-edit-form.component.html',
  styleUrls: ['./destinations-edit-form.component.css']
})

export class DestinationsEditFormComponent implements OnChanges {
  @Input() destination: Destination | undefined;
  @Output() destinationEdited = new EventEmitter<Destination>();
  destinationEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private destinationService: DestinationsService
  ) {
    this.destinationEditForm = this.formBuilder.group({
      city_name: ['', Validators.required],
      city_desc: ['', Validators.required],
      country_name: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.destination) {
      this.destinationEditForm.patchValue({
        city_name: this.destination.city_name,
        city_desc: this.destination.city_desc,
        country_name: this.destination.country_name
      });
    }
  }

  onSave(): void {
    if (this.destinationEditForm.valid) {
      const editedDestination = this.destinationEditForm.value as Destination;
      this.destinationService.updateDestinations(editedDestination).subscribe(
        (updatedDestination: Destination) => {
          this.destinationEdited.emit(updatedDestination);
          window.location.reload();

          this.resetForm();
        },
        (error) => {
          console.error('Erro ao atualizar o destino', error);
        }
      );
    }
  }

  resetForm(): void {
    this.destinationEditForm.reset();
  }
}
