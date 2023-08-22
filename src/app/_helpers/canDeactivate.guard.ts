import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { ProductService } from '../_services/product.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<DetailsComponent> {
  constructor(public _apiService: ProductService) {}
  canDeactivate(component: DetailsComponent): boolean {
    if (component.updateProductForm.dirty && !this._apiService.isSaved) {
      return confirm(
        'Are you sure you want to navigate away and lose changes to the form?'
      );
    }

    return true;
  }
}
