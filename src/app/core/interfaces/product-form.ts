import { FormControl } from "@angular/forms";

export interface IProductForm {
  id?: FormControl<number | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  discountPercentage?: FormControl<number | null>;
}
