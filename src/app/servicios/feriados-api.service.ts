import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFeriadosService {

  constructor(private http: HttpClient) { }

  obtenerFeriados(): Observable<any> {
    return this.http.get<any>('https://api.victorsanmartin.com/feriados/en.json');
  }

}
