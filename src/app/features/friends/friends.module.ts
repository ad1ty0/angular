import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './components/friends.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FriendsRoutingModule,
    SharedModule
  ]
})
export class FriendsModule { }
