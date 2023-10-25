import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { MenuController } from '@ionic/angular';
import { AsignaturasManagerService } from 'src/app/servicios/asignaturas.service';
import { IAsignatura } from 'src/app/pages/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  asignaturas: any;
  registroForm: FormGroup;
  
  constructor(
    private builder: FormBuilder,
    private authservice: AuthService,
    private menuController: MenuController,
    private asignaturasService: AsignaturasManagerService,
    private alertcontroller: AlertController,
    private router:Router

  ) {
    this.registroForm = this.builder.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'apellido': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl("", [Validators.required, Validators.minLength(8)]),
      'asignaturas': new FormControl("", [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit() {
    this.asignaturasService.getAsignaturas().subscribe(
      (data: IAsignatura[]) => {
        // Verifica el tipo de datos recibidos
        if (Array.isArray(data) && data.length > 0) {
          // Los datos son un array de IAsignatura y no está vacío
          this.asignaturas = data;
          console.log('Asignaturas recibidas:', this.asignaturas);
        } else {
          console.error('Error: Los datos recibidos no son válidos.');
        }
      },
      error => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );

  }

  registrar() {
    if (this.registroForm.valid) {
      const nuevoDocente = {
        id: 0,
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        correo: this.registroForm.value.correo,
        contrasena: this.registroForm.value.contrasena,
        asignaturas: this.registroForm.value.asignaturas,
        isActive: true
      };

      // Llamada al servicio para registrar el docente
      this.authservice.RegistrarDocente(nuevoDocente).subscribe(
        (response) => {
          console.log('Docente registrado exitosamente:', response);
          this.registroForm.reset();
          this.msgexitoso();
          this.router.navigateByUrl("/login");

          // Realizar acciones adicionales después de registrar el docente, si es necesario
        },
        (error) => {
          console.error('Error al registrar el docente:', error);
          this.error('Error al registrar el docente:');
          // Mostrar mensaje de error al usuario, si es necesario
        }
      );
    } else {
      console.error('Formulario no válido. Por favor, revise los campos.');
      this.error('Formulario no válido. Por favor, revise los campos.');
      // Mostrar mensaje de error al usuario por formulario no válido
    }
  }
  MostrarMenu(){
    this.menuController.open('first');
  }

  async msgexitoso() {
    const alerta = await this.alertcontroller.create({
      header: 'Registro exitoso!',
      message: 'Por favor, ingresa con tus credenciales',
      buttons: ['Ok']
    });
    alerta.present();
  }

  async error(msg: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: msg,
      buttons: ['Ok']
    });
    alerta.present();
  }

}