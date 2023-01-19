import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './people/people.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PeopleComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
