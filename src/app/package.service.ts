import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from './models/package';


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  
  private apiUrl = "http://localhost:8090/api/packages";

  constructor(private http: HttpClient) { }

  getPackage(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  getPackagesByCity(city: string): Observable<Package[]> {
    const url = `${this.apiUrl}/city/${city}`;
    console.log('Making request to backend with URL:', url);
    return this.http.get<Package[]>(url);
   }

  createPackage (newPackage: Package): Observable<Package> {
    return this.http.post<Package>(this.apiUrl, newPackage);
  }

  updatePackage(pack: Package): Observable<Package> {
    const apiUrlID = this.apiUrl+"/"+pack._id;
    return this.http.put<Package>(apiUrlID, pack);
  }

  deletePackage(pack: Package): Observable<Package> {
    const apiUrlID = this.apiUrl+"/"+pack._id;
    return this.http.delete<Package>(apiUrlID);
  }
}
