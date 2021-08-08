import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPhoneNumber: ''
  }

  ngOnInit(): void {
  }

  //Registaration Form Submit Function
  signupFormSubmit() {
    console.log(this.user);

    //start ClientSide validations
    if (this.user.username == '' || this.user.username == null) {
      //alert('Name is Required!!');
      this.snack.open('Name field is required !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      //alert('Password is Required!!');
      this.snack.open('Password field is required !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.user.userFirstName == '' || this.user.userFirstName == null) {
      //alert('First Name is Required!!');
      this.snack.open('FirstName field is required !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.user.userLastName == '' || this.user.userLastName == null) {
      //alert('Last Name is Required!!');
      this.snack.open('LastName field is required !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.user.userEmail == '' || this.user.userEmail == null) {
      //alert('Email is Required!!');
      this.snack.open('Email field is required !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.user.userPhoneNumber == '' || this.user.userPhoneNumber == null) {
      //alert('Phone Number is Required!!');
      this.snack.open('PhoneNumber field is required !!', '', {
        duration: 3000
      });
      return;
    }
    //end ClientSide validations


    //add user  :UserService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Successfully Registraction Done !!', 'Registered User Name is :: ' + data.username, 'success');
      }, (error) => {
        //fail
        console.log(error);
        // alert('Something Went Wrong')
        this.snack.open('Something Went Wrong !!', '', {
          duration: 3000
        });

      }
    );


  }

}
