import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Package } from '../models/package';
import { PackageService } from '../package.service';



@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  editingMode: boolean = false;
  package: Package | null = null;;
  @Input() packages: Package[] = [];
  @Input() selectedPackage?: Package | null = null;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();


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
                this.packages = data;
                console.log("Packages selecionados", this.packages);
              },
              error => {
                console.error('Error fetching package details:', error);
              }
            );
        }
      });
    } 
    
    onEdit(selectedPackage: Package): void {
      this.editingMode = true;
      this.selectedPackage = selectedPackage;
    }
    
    onDelete(selectedPackage: Package): void {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este pacote?');
      
      if (confirmDelete) {
        this.packageService.deletePackage(selectedPackage).subscribe(
          () => {
            console.log('Pacote excluído com sucesso.');
            this.router.navigate(['/packages']);
          },
          (error) => {
            console.error('Erro ao excluir o pacote:', error);
         });
      }
    }
}
