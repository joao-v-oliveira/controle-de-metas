import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { MaterialModule } from 'src/app/components/angular-material/material/material.module';
import { PainelExpansionComponent } from 'src/app/components/painel-expansion/painel-expansion.component';

@NgModule({
  declarations: [
    InicioComponent,
    PainelExpansionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule,
  ]
})
export class InicioModule { }
