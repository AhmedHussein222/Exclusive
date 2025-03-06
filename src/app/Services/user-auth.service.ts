import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iuser } from '../Models/Iuser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  loggeedProp : BehaviorSubject<boolean>
  constructor(
    private users : UserService
  ) { 
    this.loggeedProp = new BehaviorSubject<boolean>(false)
  }


  login(user:Iuser){  //username:string,password:string
    this.users.check(user).subscribe(
      (data)=>{
      if (data) {
        console.log(data);
        let token:string = "token123"
        localStorage.setItem("Token",token)
        this.loggeedProp.next(true)
        
      }
      }
    )
  }

  logout(){
    localStorage.removeItem("Token")
    this.loggeedProp.next(false)

  }
  get isLogged():boolean{
    return (localStorage.getItem("Token"))? true :false
  }

   isLoggedObs(){
    return this.loggeedProp
  }
}
