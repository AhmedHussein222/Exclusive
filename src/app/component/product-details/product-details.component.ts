import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule , RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  ids:number[]=[]
  product!:IProduct ;
  currentId!:number;
  index!:number ;
  relatedProducts:IProduct[]=[]
constructor(
  private url:ActivatedRoute,
  private _ProductService:ProductService,
  private router:Router
){
  this.url.paramMap.subscribe(
    params=>{
      this.currentId=parseInt(params.get('id')!)
      this._ProductService.getProductByID(this.currentId).subscribe(
        (res)=>{
          this.product=res
          this.index=this.ids.indexOf(this.currentId)

          this._ProductService.getRelatedProducts(res?.category.name).subscribe(
            (res)=>{
              this.relatedProducts=res
              console.log(res);
              
            }
          )

        }
      )
    }
  )


}
// ngOnInit(){
//   this._ProductService.getRelatedProducts(this.product?.category.name).subscribe(
//     (res)=>{
//       this.relatedProducts=res
//     }
//   )
// }
next(){
  this.router.navigateByUrl(`/productDetails/${this.ids[++this.index]}`)
}
previous(){
  this.router.navigateByUrl(`/productDetails/${this.ids[--this.index]}`)
}
toggleFavorite(product: IProduct) {

  let heartIcon = document.getElementById(product.id.toString());
  this._ProductService.checkInWishlist(product).subscribe({
    next: () => {
      

        heartIcon!.classList.toggle('bi-heart');
        heartIcon!.classList.toggle('bi-heart-fill');

      

    }
  })
}


}
