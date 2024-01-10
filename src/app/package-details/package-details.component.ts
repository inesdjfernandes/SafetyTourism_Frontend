import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Package } from '../package';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  @Input() selectedPackage?: Package | null = null;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();
  editingMode: boolean = false;

  constructor(
    private router: Router,
    private packageService: PackageService,
    private route: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const packageCity = params.get('city');
        console.log('Received city parameter:', packageCity);
        if (packageCity) {
          this.packageService.getPackagesByCity(packageCity)
            .subscribe(
              (data: Package[]) => {
                console.log('Received package data from backend:', data);
                if (data.length > 0) {
                  this.selectedPackage = data[0];
                  console.log("Package selecionado", this.selectedPackage);
                } else {
                  console.error('Package data is empty.');
                }
              },
              error => {
                console.error('Error fetching package details:', error);
              }
            );
        }
      });
    }
    
    
onEdit(): void {
    this.editingMode = true;
  }

onDelete(): void {
  if (this.selectedPackage) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este pacote?');
    
    if (confirmDelete) {
      this.packageService.deletePackage(this.selectedPackage).subscribe(
        () => {
          console.log('Pacote excluído com sucesso.');
          this.router.navigate(['/packages']); // Redirecionar para a lista de pacotes após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir o pacote:', error);
        });
      }
    }
  }
}
