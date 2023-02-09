import { createViewChild } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns = ['name', 'price', 'stock', 'operations']
  productForm;
  products$: Observable<Product[]>;
  filterProducts$: Observable<Product[]>;

  @ViewChild('name') productName: ElementRef; 

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private snackBar: MatSnackBar
    
    ) { this.buildProductForm() }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  buildProductForm() {
    this.productForm = this.fb.group(
      {
        id: [undefined],
        name: ['', [Validators.required]],
        stock: [0, [Validators.required]],
        price: [0, [Validators.required]],

      }
    )
  }

  onSubmit() {
    let p: Product = this.productForm.value;
    if(!p.id){
      this.addProduct(p);
    }else{
      this.updateProduct(p);
    }
  }

  addProduct(p: Product) {
    this.productService.addProduct(p)
      .then(
        () => {
          this.snackBar.open('Produto cadastrado', 'Ok',
          {duration: 2000});
          this.resetForm();
          
        }
      )
      .catch(
        (err) => {
          console.log(err);          
          this.snackBar.open('Erro! Você não foi registrado', 'Ok',
          {duration: 2000});
        }
      )
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  updateProduct(p: Product) {
    this.productService.updateProduct(p).then(
      () => {
        this.snackBar.open('Produto editado com sucesso!', 'Ok',
          {duration: 2000});
          this.resetForm();
      }
    )
    .catch(
      (err) => {
        this.snackBar.open('Erro! registro não editado', 'Ok',
          {duration: 2000});
      }
    )
  }

  resetForm(): void {
    this.productForm.reset({id: undefined, name: '', stock: 0, price: 0});
    this.productName.nativeElement.focus();
  }
  

  del(p: Product) {
    this.productService.deleteProduct(p).then(
      () => {
        this.snackBar.open('Produto excluído!', 'Ok',
          {duration: 2000});
      }
    )
    .catch(
      (err) => {
        this.snackBar.open('Erro! registro não deletado', 'Ok',
          {duration: 2000});
      }
    )
  }

  filter(event) {
    this.filterProducts$ = this.productService.searchByName(event.target.value);    
  }

}
