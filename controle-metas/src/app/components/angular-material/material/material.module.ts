import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  exports: [
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
