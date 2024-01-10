import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsComponent } from './destinations/destinations.component';
import { PackageComponent } from './package/package.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DestinationsDetailsComponent } from './destinations-details/destinations-details.component';
import { PackageDetailsComponent } from './package-details/package-details.component';

const routes: Routes = [
  { path: 'destinations', component: DestinationsComponent },
  { path: 'destination/:city_name', component: DestinationsDetailsComponent },
  { path: 'packages', component: PackageComponent },
  { path: 'package/:city', component: PackageDetailsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'home', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
