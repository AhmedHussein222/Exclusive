import { Component } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  wishlistProducts!:IProduct[]
  constructor(
    private productService: ProductService,
  ) {
     this.productService.getWishlistProducts().subscribe(
      (res) => {
      this.wishlistProducts = res;
      });
}
}
