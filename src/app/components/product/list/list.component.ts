import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Observable, map, catchError, throwError } from 'rxjs';
import { IProductList } from 'src/app/core/interfaces/product-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public productList$!: Observable<IProductList[]>;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage();
  }
  
  loadPage() {
    this.productList$ = this.productService.getAll().pipe(
      map((data: any) => data.products),
      catchError((err) => {
        return throwError(() => console.error(err));
      })
    );
  }

  public delete(id: number, product: string): void {
    Swal.fire({
      title: 'Attention!',
      text: `Do you want to remove the ${product} product?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('this.productList$ -> ', this.productList$);
        this.productService.delete(id).subscribe(
          (result) => {
            console.log('result -> ', result);
            Swal.fire({
              icon: 'success',
              title: 'Product deleted successfully!',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.loadPage();
            });
          }
        );
      }
    });
  }
}
