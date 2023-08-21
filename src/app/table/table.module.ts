import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from  './table.component';
import { MyActiveDirective } from './active.directive';
import { ProductPipe } from '../core/product.pipe';
import { SortableHeaderDirective } from '../core/sortable-header.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ 
    MyTableComponent, 
    MyActiveDirective,
    ProductPipe, 
    SortableHeaderDirective ],
  exports: [ MyTableComponent ]
})
export class TableModule {}