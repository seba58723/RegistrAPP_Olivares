import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Registrarse2PageRoutingModule } from './registrarse2-routing.module';

import { Registrarse2Page } from './registrarse2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Registrarse2PageRoutingModule
  ],
  declarations: [Registrarse2Page]
})
export class Registrarse2PageModule {}
