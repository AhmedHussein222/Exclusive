import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { SignupComponent } from './component/signup/signup.component';




export const routes: Routes = [
    {path:'',redirectTo:"home",pathMatch:"full"},
    {path:'home',component:HomeComponent},
    {path:'product-details/:id',component:ProductDetailsComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'signup',component:SignupComponent},
    {path:'**',component:NotfoundComponent},

];
