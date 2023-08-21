import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "./product";

@Pipe({ name: "product" })
export class ProductPipe implements PipeTransform {
  transform(values: Product[], filter: string): Product[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Product) => {
      const nameFound =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const typeFound =
        value.type.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      if (nameFound || typeFound) {
        return value;
      }
    });
  }
}
