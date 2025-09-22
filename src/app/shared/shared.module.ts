import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './components/navigation.component';
import { ConfirmationModalComponent } from './components/confirmation-modal.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NavigationComponent,
    ConfirmationModalComponent
  ]
})
export class SharedModule { }
