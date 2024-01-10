import { Injectable } from '@angular/core';
import { Destination } from './destination';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  private apiUrl = "http://localhost:8090/api/destinations";

  constructor(private http: HttpClient) { }

  getDestinations(): Observable <Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }

    // Add a method to get a destination by ID
    getDestinationByCity(city: string): Observable<Destination> {
      const url = `${this.apiUrl}/city/${city}`;
      console.log('Making request to backend with URL:', url);
      return this.http.get<Destination>(url);
     }
  

  createDestinations(newDestination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, newDestination);
  }

  updateDestinations(destination: Destination): Observable<Destination> {
    const apiUrlID = this.apiUrl+"/"+destination.city_name;
    return this.http.put<Destination>(apiUrlID, destination);
  }

  deleteDestination(destination: Destination): Observable<Destination> {
    const apiUrlID = this.apiUrl+"/"+destination.city_name;
    return this.http.delete<Destination>(apiUrlID); }
}
