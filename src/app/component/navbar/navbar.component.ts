import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { UserAuthService } from '../../Services/user-auth.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logout(){
    this._user.logout()
  }
  isLogged!: boolean 
  constructor(private _user : UserAuthService) {

   }
  ngOnInit(): void {
    
    
    this._user.isLoggedObs().subscribe((data)=>{
      this.isLogged = data
      console.log(data);
    })
    localStorage.getItem('Token') ? this.isLogged = true : this.isLogged = false
}}
