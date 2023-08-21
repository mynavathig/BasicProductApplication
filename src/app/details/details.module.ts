import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details_routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [ DetailsComponent ]
})
export class DetailsModule {}