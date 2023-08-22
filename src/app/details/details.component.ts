import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private router: Router
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
    const id = this._currentRoute.snapshot.params.index;
    this._apiService.getCustomerByGivenId(id).subscribe(
      response => {
        this.updateProductForm.controls["id"].setValue(response.id);
        this.updateProductForm.controls["name"].setValue(response["name"]);
        this.updateProductForm.controls["type"].setValue(response["type"]);
        this.updateProductForm.controls["price"].setValue(response["price"]);
        this.updateProductForm.controls["units"].setValue(response["units"]);
        this.updateProductForm.controls["manufacturing"].setValue(response["manufacturing"]);
      }
    );
  }

  updateProductDetail() {
    this._apiService.updateProductList(this.updateProductForm.value).subscribe(response =>{
      this.router.navigate(['/dashboard']);
    });
  }
}