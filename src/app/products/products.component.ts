import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../models/api-models/ui-models/product.model';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['productName', 'cost', 'quantity', 'companyName', 'edit'];


  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) matPaginator !: MatPaginator;
  filterString = '';

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: (successResponse) => {
          this.products = successResponse;
          this.dataSource = new MatTableDataSource<Product>(this.products);

          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        }
      });
  }

  filterProducts() {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

  logout(){
    this.authService.removeToken();
  }
}
