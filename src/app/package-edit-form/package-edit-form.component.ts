import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Package } from '../models/package';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-edit-form',
  templateUrl: './package-edit-form.component.html',
  styleUrls: ['./package-edit-form.component.css']
})
export class PackageEditFormComponent {
  @Input() package?: Package;
  @Output() packageEdited = new EventEmitter<Package>();
  packageEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService
  ) {
    this.packageEditForm = this.formBuilder.group({
      _id: [''],
      city: ['', Validators.required],
      pack_desc: ['', Validators.required],
      pack_price: ['', Validators.required],
      pack_type: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.package) {
      this.packageEditForm.patchValue({
        _id: this.package._id,
        city: this.package.city,
        pack_desc: this.package.pack_desc,
        pack_price: this.package.pack_price,
        pack_type: this.package.pack_type
      });
    }
  }
  
  onSave(): void {
    if (this.packageEditForm.valid) {
      const editedPackage = this.packageEditForm.value as Package;
      this.packageService.updatePackage(editedPackage).subscribe(
        (updatedPackage: Package) => {
          this.packageEdited.emit(updatedPackage);
          this.resetForm();
        },
        (error) => {
          console.error('Error updating package:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.packageEditForm.reset();
  }
}
