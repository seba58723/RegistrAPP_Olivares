import { Component } from '@angular/core';

interface Componente{
  name: string;
  icon: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  opciones : Componente[]=[
    {
      name:'inicio',
      icon: 'home-outline',
      redirecTo:'/docente'
    },
    {
      name:'Codigo',
      icon: 'help-circle-outline',
      redirecTo: '/card'
    },
    {
      name:'Formulario',
      icon: 'create-outline',
      redirecTo: '/registrarse2'
    },
    {
      name:'Ayuda',
      icon: 'help-circle-outline',
      redirecTo: '/ayuda'
    },
  ]
  constructor() {}
}
