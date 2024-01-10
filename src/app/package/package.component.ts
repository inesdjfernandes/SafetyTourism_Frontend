import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Package } from '../package';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  packages: Package[] = [];
  selectedPackage?: Package;
  editingMode: boolean = false;

  constructor(private router: Router, private packageService: PackageService) {}

  ngOnInit(): void {
    this.getPackages();
  }

  onSelect(pack: Package): void {
    this.selectedPackage = pack;
    this.router.navigate(['/package', this.selectedPackage.city]);
  }

  getPackages(): void {
    this.packageService.getPackage()
      .subscribe((data: Package[]) => {
        this.packages = data;
      });
  }

  onPackageCreated(newPackage: Package): void {
    this.getPackages();
  }

  onPackageEdit(): void {
    this.editingMode = true;
  }

  onPackageDelete(): void {
    if (this.selectedPackage) {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este pacote?');
      if (confirmDelete) {
        this.packageService.deletePackage(this.selectedPackage).subscribe(
          () => {
            console.log('Pacote excluído com sucesso.');
            this.getPackages();
            this.editingMode = false;
          },
          (error) => {
            console.error('Erro ao excluir o pacote:', error);
          }
        );
      }
    }
  }

  onPackageEdited(editedPackage?: Package): void {
    if (editedPackage) {
      console.log('Pacote editado:', editedPackage);
    }
  }
}
