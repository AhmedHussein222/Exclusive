import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Models/iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  ids:number[]=[]
  product!:IProduct ;
  currentId!:number;
  index!:number ;
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
          console.log(res);
          
          this.index=this.ids.indexOf(this.currentId)
        }
      )
    }
  )

}
next(){
  this.router.navigateByUrl(`/productDetails/${this.ids[++this.index]}`)
}
previous(){
  this.router.navigateByUrl(`/productDetails/${this.ids[--this.index]}`)
}

}
