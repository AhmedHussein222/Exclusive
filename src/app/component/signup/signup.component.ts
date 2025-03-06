import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { UserAuthService } from '../../Services/user-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  loginForm: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});
  isLogged: boolean = false;
  constructor(
    private _user: UserService,
    private auth: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })

  }
  addNewUser() {
    // this._user.addUser(this.user).subscribe({ // this.user     using driven template in html file
    this._user.addUser(this.signupForm.value).subscribe({
      next:(data)=>{
        console.log(data,'Signup');
        this.showSuccess()
        // Swal.fire({ title: 'Sign Up Successfuly', text: 'ddddddddd', icon: 'success', timer: 3000, showConfirmButton: false })
      }
    });
  }

  login(){
    this.auth.login(this.loginForm.value)
    this.isLogged = true
    this.auth.isLoggedObs().subscribe((data)=>{
      if (data) {
        this.router.navigate([''])
        this.showSuccess()
        }
      }
      )
        
      
  }
  showSuccess() {
    this.snackBar.open('Register successfully', 'close', {
      duration: 3000, // الإشعار سيختفي بعد 3 ثوانٍ
      panelClass: ['success-snackbar','fixed-top'] // لتنسيق خاص بـ CSS
    });
  }
}
