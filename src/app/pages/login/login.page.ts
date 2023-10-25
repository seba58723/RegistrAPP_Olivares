import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  userdata: any; 

  usuario= {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    asignaturas: [],
    isActive: true
  };

  loginForm: FormGroup;

  constructor(private authservice: AuthService,
              private router: Router,
              private alertController: AlertController,
              private toastController: ToastController,
              private builder: FormBuilder,
              private menuController: MenuController,) {
    this.loginForm = this.builder.group({
      'correo': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('ingresado')){
      this.router.navigateByUrl('/vista-docente');
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.authservice.GetUserById(this.loginForm.value.correo).subscribe(resp => {
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.length > 0) {
          this.usuario = { ...this.userdata[0] }; 
          if (this.usuario.contrasena === this.loginForm.value.password) {
            if (this.usuario.isActive) {
              // Inicia sesión del usuario
              sessionStorage.setItem('correo', this.usuario.correo);
              sessionStorage.setItem('nombre', this.usuario.nombre);
              sessionStorage.setItem('apellido', this.usuario.apellido);
              sessionStorage.setItem('ingresado', 'true');
              // Invoca una alerta utilizando Toast
              this.showToast('Sesión Iniciada');
              this.loginForm.reset();
              this.router.navigateByUrl("/docente");
            } else {
              this.UserInactivo();
              this.loginForm.reset();
            }
          } else {
            this.DatoError();
            this.loginForm.reset();
          }
        } else {
          this.NoExiste();
          this.loginForm.reset();
        }
      });
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UserInactivo() {
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usuario inactivo, contactar a admin@admin.cl',
      buttons: ['Ok']
    });
    alerta.present();
  }

  async DatoError() {
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['Ok']
    });
    alerta.present();
  }

  async NoExiste() {
    const alerta = await this.alertController.create({
      header: 'Debe registrarse..',
      message: 'Usuario no existe',
      buttons: ['Ok']
    });
    alerta.present();
  }
  MostrarMenu(){
    this.menuController.open('first');
  }
}