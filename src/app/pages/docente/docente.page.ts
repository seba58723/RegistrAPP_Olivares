import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiFeriadosService } from 'src/app/servicios/feriados-api.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  nombre: any;
  apellido: any;
  feriados: any[] = [];

  constructor(
             private http: HttpClient,
             private apiferiados: ApiFeriadosService,
             private alertcontroller:AlertController,
             private router:Router,
             private menuController: MenuController) { 
  }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.obtenerFeriados();
  }


  obtenerFeriados() {
    this.apiferiados.obtenerFeriados().subscribe(
      (data: { status: string, data:[] }) => {
        if (data.status === 'success') {
          this.feriados = data.data;
        } else {
          console.error('Error al obtener los feriados.');
        }
      },
      error => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  logout() {
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('contrasena');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('apellido');
    sessionStorage.removeItem('ingresado');
    this.router.navigateByUrl('/login');
  }

  async confirmLogout() {
    const alert = await this.alertcontroller.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {

            this.logout(); 
          },
        },
      ],
    });

    await alert.present();
  }

  MostrarMenu(){
    this.menuController.open('first');
  }
}