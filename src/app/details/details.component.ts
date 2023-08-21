import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../core/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'my-details',
  templateUrl: 'details.component.html'
})
export class DetailsComponent {

  public product$: Observable<Product>;
  updateProductForm: FormGroup;

  constructor(
    private _apiService: ProductService,
    private _currentRoute: ActivatedRoute,    
    private formBuilder: FormBuilder
  ) {
    this.product$ = _apiService.getProduct(_currentRoute.snapshot.params.index);
    this.updateProductForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      type: [""],
      price: [],
      units : [],
      manufacturing: [""]
    });
  }

  ngOnInit() {
    const promise = this._apiService.getCustomerByGivenId(
      //this._apiService.getViewProdutId()
      1
    );
    promise.then(
      response => {
        console.log(response)
        // this.updateProductForm.controls["id"].setValue(response.id);
        // this.updateProductForm.controls["name"].setValue(response["name"]);
        // this.updateProductForm.controls["type"].setValue(response["type"]);
        // this.updateProductForm.controls["price"].setValue(response["price"]);
        // this.updateProductForm.controls["units"].setValue(response["units"]);
        // this.updateProductForm.controls["manufacturing"].setValue(response["manufacturing"]);
      },
      error => {
        console.log("error " + error);
      }
    );
  }

  updateProductDetail() {
    console.log(
      "update product " + JSON.stringify(this.updateProductForm.value)
    );
  }
}