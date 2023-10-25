import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDocente } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  //obtenemos un observable con todos los usuarios almacenados
  GetAllUsers():Observable<IDocente>{
    return this.httpclient.get<IDocente>(`${environment.apiUrl}/docentes`);
  }

  //obtenemos un observable con la información que se busca a través de username
  GetUserById(codigo: any):Observable<IDocente>{
    return this.httpclient.get<IDocente>(`${environment.apiUrl}/docentes/?correo=${codigo}`);
  }

  IsLogged(){
    return sessionStorage.getItem('correo')!=null;
  }

  RegistrarDocente(newUser: IDocente): Observable<IDocente> {
    return this.httpclient.post<IDocente>(`${environment.apiUrl}/docentes`, newUser);

  }
  

}
