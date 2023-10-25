import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsignatura } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasManagerService {

  constructor(private httpclient:HttpClient) { }

 getAsignaturas(): Observable<IAsignatura[]> {
    return this.httpclient.get<IAsignatura[]>(`${environment.apiUrl}/asignaturas`);
  }

}
