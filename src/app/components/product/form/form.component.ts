import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProductForm } from 'src/app/core/interfaces/product-form';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public pageId: number | null = null;
  public showButton = true;

  constructor(
    private productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.pageId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadPage();
  }

  public form = new FormGroup<IProductForm>({
    id: new FormControl(null, { nonNullable: false}),
    title: new FormControl('', { nonNullable: true, validators: [ Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    discountPercentage: new FormControl(null, { nonNullable: true, validators: [Validators.min(0)] }),
  });

  public onSubmit() {
    if (this.form.valid) {
      if (this.pageId) {
        this.update();
      } else {
        this.create();
      }
    } else {
      this.showAlertFormInvalid();
    }
  }

  private create(): void {
    const entity = this.form.value as unknown as IProductForm;

    this.productService.post(entity).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Product created successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['/product']);
      });
    });
  }

  private update(): void {
    const entity = this.form.value as unknown as IProductForm;
    entity.id = this.pageId as any;

    this.productService.put(entity).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Product successfully updated!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['/product']);
      });
    });
  }

  private getById(): void {
    const product = this.productService.getById(this.pageId as number)
    .subscribe((result) => {
      this.form.patchValue({
        id: result.id,
        title: result.title,
        description: result.description,
        price: result.price,
        discountPercentage: result.discountPercentage,
      });
    });
  }

  private loadPage(): void {
    if (this.pageId) {
      this.getById();

      if (this.router.url.includes('view')) {
        this.showButton = false;
        this.form.disable();
      } else {
        this.showButton = true;
      }
    }
  }

  public showErrorField(field: string): boolean | undefined {
    return (
      this.form.get(field)?.invalid &&
      (this.form.get(field)?.dirty || this.form.get(field)?.touched)
    );
  }

   public hasError(field: string, rule: string): boolean {
    return this.form.get(field)?.errors?.[rule];
  }

  private showAlertFormInvalid(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Attention!',
      text: 'Fill in all required fields.',
      showConfirmButton: true
    });
  }
}
