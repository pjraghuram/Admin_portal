import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/models/api-models/ui-models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId: string | null | undefined;
  product: Product = {
    id: '',
    productName: '',
    productImage: '',
    cost: '',
    quantity: '',
    companyName: ''
  }
  isNewProduct = false;
  header = '';
  @ViewChild('productDetailsForm') productDetailsForm?: NgForm;

  constructor(private readonly route: ActivatedRoute, 
    private readonly productService: ProductService, 
    private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.productId = params.get('id');
        if (this.productId) {

          if(this.productId.toLowerCase()=='Add'.toLowerCase()){
            this.isNewProduct = true;
            this.header = 'Add New Product';
          }
          else
          {
            this.isNewProduct= false;
            this.header = 'Edit Product';
            this.productService.getProduct(this.productId)
            .subscribe(
              (successResponse) => {
                this.product = successResponse;
              }
            );
          }
        }
      }
    );
  }

  home() {
    this.router.navigateByUrl('/products');
  }

  onUpdate(): void{
    if(this.productDetailsForm?.form.valid)
    {
      this.productService.updateProduct(this.product.id, this.product)
    .subscribe({
      next: (successResponse) => {
        // show notification
        this.snackbar.open('Product Updated Successfully', undefined, {
          duration: 2000
        });
      },
      error: (errorResponse) => {
      }
  });
    } 
  }

  onDelete(): void{
    this.productService.deleteProduct(this.product.id)
    .subscribe({
      next: (successResponse) => {
        this.snackbar.open('Product Deleted Successfully', undefined, {
          duration: 2000
        });
        // navigate to home page
        setTimeout(() => {
          this.router.navigateByUrl('/products');
        }, 2000);
      },
      error: (errorResponse) => {
      }
  });
  }

  onAddProduct(): void{
    if(this.productDetailsForm?.form.valid)
    {
      this.productService.addProduct(this.product).
    subscribe({
      next: (successResponse) => {
        this.snackbar.open('Product Added Successfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/products');
        }, 2000);
      },
      error:(errorResponse) => {
        console.log(errorResponse);
      }
    });
    }
    }
  }

