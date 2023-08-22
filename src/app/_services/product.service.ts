import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config, ProductList } from '../table';
import { Product } from '../core/product';
import { ApiAnswer } from '../core/api-answer';
import { configColumns } from '../core/config';

@Injectable()
export class ProductService {
  product?: Product;
  productListData: Product[] = ProductList;
  isSaved = false;
  public getConfig(): Config {
    return configColumns;
  }

  public getData(
    limit: number,
    offset: number,
    config?: Config
  ): Observable<ApiAnswer<Product>> {
    if(config) {
      let columnConfig = config.find(x => x.isCurrent === 1);
      if(columnConfig) {
        if(columnConfig.sort === 'asc'){
          this.sortByAscending(this.productListData, columnConfig.value);
        } else {
          this.sortByDescending(this.productListData, columnConfig.value);
        }
      }
    }
    return of(ProductList).pipe(
      map((ProductList: Product[]) => {
        const result: ApiAnswer<Product> = {
          limit: limit,
          offset: offset,
          total: ProductList.length,
          result: ProductList.slice(offset, limit + offset),
        };

        return result;
      })
    );
  }

  public getFilterData(
    limit: number,
    offset: number,
    searchString: any,
    config?: Config
  ): Observable<ApiAnswer<Product>> {
    if(config) {
      let columnConfig = config.find(x => x.isCurrent === 1);
      if(columnConfig) {
        if(columnConfig.sort === 'asc'){
          this.sortByAscending(this.productListData, columnConfig.value);
        } else {
          this.sortByDescending(this.productListData, columnConfig.value);
        }
      }
    }
    let products = ProductList.filter((value: Product) => {
      const nameFound =
        value.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      const typeFound =
        value.type.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      if (nameFound || typeFound) {
        return value;
      }
    });
    return of(products).pipe(
      map((products: Product[]) => {
        const result: ApiAnswer<Product> = {
          limit: limit,
          offset: offset,
          total: products.length,
          result: products.slice(offset, limit + offset),
        };

        return result;
      })
    );
  }

  public getProduct(index: number): Observable<Product> {
    return of(ProductList[index] as Product);
  }

  getCustomerByGivenId(id: number): Observable<any> {
    this.product = this.productListData.find(
      (productData) => productData.id == id
    );
    return of(this.product);
  }

  updateProductList(product: Product): Observable<any> {
    let index = this.productListData.findIndex(
      (productData) => productData.id == product.id
    );
    this.productListData[index] = product;
    return of(product);
  }

  sortByAscending(list: any[], propertyName: string, type?: string) {
    if (list && list.length > 0) {
      list.sort((val1: any, val2: any): any => {
        if (type === 'date') {
          return (
            new Date(val1[propertyName]).getTime() -
            new Date(val2[propertyName]).getTime()
          );
        } else if (
          val1[propertyName] &&
          val2[propertyName] &&
          val1[propertyName].toLowerCase
        ) {
          return val1[propertyName].toLowerCase() <
            val2[propertyName].toLowerCase()
            ? -1
            : 1;
        } else {
          return val1[propertyName] < val2[propertyName] ? -1 : 1;
        }
      });
    }
  }

  sortByDescending(list: any[], propertyName: string, type?: string) {
    if (list && list.length > 0) {
      list.sort((val1: any, val2: any): any => {
        if (type === 'date') {
          return (
            new Date(val2[propertyName]).getTime() -
            new Date(val1[propertyName]).getTime()
          );
        } else if (
          val1[propertyName] &&
          val2[propertyName] &&
          val1[propertyName].toLowerCase
        ) {
          return val2[propertyName].toLowerCase() <
            val1[propertyName].toLowerCase()
            ? -1
            : 1;
        } else {
          return val2[propertyName] < val1[propertyName] ? -1 : 1; // val2[propertyName] - val1[propertyName];
        }
      });
    }
  }
}
