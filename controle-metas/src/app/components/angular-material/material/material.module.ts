import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
