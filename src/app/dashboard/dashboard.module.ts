import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table/table.module';
import { DetailsModule } from '../details/details.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    TableModule,
    DetailsModule
  ],
  declarations: [ DashboardComponent]
})
export class DashboardModule { }