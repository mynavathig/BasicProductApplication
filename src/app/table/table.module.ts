import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from  './table.component';
import { MyActiveDirective } from './active.directive';

@NgModule({
  imports: [ CommonModule, FormsModule,ReactiveFormsModule ],
  declarations: [ 
    MyTableComponent, 
    MyActiveDirective 
  ],
  exports: [ MyTableComponent ]
})
export class TableModule {}