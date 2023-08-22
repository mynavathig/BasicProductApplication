import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiAnswer } from '../core/api-answer';
import { Product } from '../core/product';
import { Config } from '../table/config';
import { DataTable } from '../table/data';
import { AccountService } from '../_services/account.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private static defaulPageSize = 5;
  private static defaultPage = 0;

  public config$: Config;
  public data$: Observable<any>;
  public filterForm: FormGroup;

  get filter() {
    return this.filterForm.get('filter');
  }

  constructor(
    private _apiService: ProductService,
    private _router: Router,
    private formBuider: FormBuilder,
    private accountService: AccountService
  ) {
    this.config$ = this._apiService.getConfig();
    this.data$ = this._apiService
      .getData(
        DashboardComponent.defaulPageSize,
        DashboardComponent.defaultPage,
        this.config$
      )
      .pipe(map(this._createDataTable));
    this.filterForm = this.formBuider.group({
      filter: [''],
    });
  }

  ngOnInit() {
    if (this.filter) {
      this.filter.valueChanges.subscribe((data) => {
        this.data$ = this._apiService
          .getFilterData(
            DashboardComponent.defaulPageSize,
            DashboardComponent.defaultPage,
            data,
            this.config$
          )
          .pipe(map(this._createDataTable));
      });
    }
  }

  private _createDataTable(answer: ApiAnswer<Product>): DataTable<Product> {
    const currentPage = Math.ceil(answer.offset / answer.limit) + 1;
    const lastPage = Math.ceil(answer.total / answer.limit);
    const result: DataTable<Product> = {
      pageActual: currentPage,
      lastPage: lastPage,
      data: answer.result,
    };

    return result;
  }

  public updateTable(pageRequest: any) {
    this.data$ = this._apiService
      .getData(pageRequest.size, pageRequest.page * pageRequest.size)
      .pipe(map(this._createDataTable));
  }

  public onSortClick(data: any) {
    this.config$ = this.config$.map((x) => {
      if (x.value === data.value) {
        if (x.isCurrent === 1) {
          x.sort = x.sort === 'asc' ? 'desc' : 'asc';
        } else {
          x.sort = 'asc';
          x.isCurrent = 1;
        }
      } else {
        x.sort = 'asc';
        x.isCurrent = 0;
      }
      return x;
    });
    this.data$ = this._apiService
      .getFilterData(
        DashboardComponent.defaulPageSize,
        DashboardComponent.defaultPage,
        this.filter?.value,
        this.config$
      )
      .pipe(map(this._createDataTable));
  }

  public goDetails(index: any) {
    this._router.navigateByUrl(`details/${index}`);
  }

  public logout() {
    this.accountService.setToken('');
    this._router.navigateByUrl('/login');
  }
}
