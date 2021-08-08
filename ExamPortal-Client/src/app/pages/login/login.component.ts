import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  loginFormSubmit() {
    console.log('login form submit button clicked');

    //client side validations
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('userName is required...!!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('userPassword is required...!!', '', {
        duration: 3000,
      });
      return;
    }

    //request to server(backend) to generate JWT Token
    this.login.generateJwtToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //redirect admin :: admin-dashboard
            //redirect normal :: narmal-dashboard
            if (this.login.getUserRole() == 'ADMIN') {
              //window.location.href = `/admin`;
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
              
            } else if (this.login.getUserRole() == 'NORMAL') {
              //window.location.href = `/user-dashboard`;
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);

            } else {
              this.login.logout();
            }

          });
      },
      (error) => {
        console.log("fail");
        console.log(error);
        this.snack.open('Invalid Credentials !! Please Try again','',{
          duration:3000
        });
      }
    );
  }

}
