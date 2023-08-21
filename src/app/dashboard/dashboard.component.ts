import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiAnswer } from '../core/api-answer';
import { Product } from '../core/product';
import { DataTable } from '../table/data';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private static defaulPageSize = 5;
  private static defaultPage = 0;

  public config$: Observable<any>;
  public data$: Observable<any>;

  constructor(
    private _apiService: ProductService,
    private _router: Router
  ) {
    this.config$ = this._apiService.getConfig();
    this.data$ = this._apiService.getData(DashboardComponent.defaulPageSize, DashboardComponent.defaultPage)
    .pipe(
      map(this._createDataTable)
    );
  }
  ngOnInit() {
  }

  private _createDataTable(answer: ApiAnswer<Product>): DataTable<Product> {
    const currentPage = Math.ceil(answer.offset / answer.limit) + 1;
    const lastPage = Math.ceil(answer.total / answer.limit);
    const result: DataTable<Product> = {
      pageActual: currentPage,
      lastPage: lastPage,
      data: answer.result
    }

    return result;
  }

  public updateTable (pageRequest: any) {
    this.data$ = this._apiService.getData(pageRequest.size, (pageRequest.page * pageRequest.size))
    .pipe(
      map(this._createDataTable)
    );
  }

  public goDetails(index: any) {
    this._router.navigateByUrl(`details/${index}`);
  }
}