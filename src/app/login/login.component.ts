import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { UserService, User } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: boolean = false;
  signupError = '';
  isLoginForm = true;
  signedUp=false;

  constructor(private authService: AuthService, private router: Router, private comp:AppComponent,
    private userService: UserService
  ) {}

  ngOnInit(){
    this.comp.onLoginPageLoad();
    this.authService.logout()
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(result => {
        if (result) {
          // this.authService.isLogedin.next(true);
          this.comp.onSucessfulLogin();
          // Navigate to home page or any other desired route on successful login
          this.router.navigate(['/home']);
          console.log('success');
        } else {
          // Show error message if login failed
          this.loginError = true;
        }
      });
  }

  onSignup(form: NgForm): void {
    if (form.valid) {
      const username = form.value['username'];
      const email = form.value['email'];

      // Check if username or email already exists
      this.userService.userExists(username, email).subscribe(
        (exists: boolean) => {
          if (exists) {
            console.log('already exist');
            
            this.signupError = 'Username or email already exists. Please choose another.';
          } else {
            // Proceed with signup
            const userDetails: User = {
              username: form.value['username'],
              name: form.value['name'],
              email: form.value['email'],
              password: form.value['password']
            };
            
            this.userService.signUpUser(userDetails).subscribe(
              (response: User) => {
                console.log('User signed up successfully:', response);
                this.toggleForm('signup');

                // Optionally, you can redirect to login page or handle success message
              },
              (error) => {
                console.error('Error signing up:', error);
                this.signupError = 'Failed to sign up user. Please try again later.';
              }
            );
          }
        },
        (error) => {
          console.error('Error checking user existence:', error);
          this.signupError = 'Failed to check user existence. Please try again later.';
        }
      );
    }
  }

  toggleForm(form:string){
if(form == 'login'){
  this.isLoginForm = false
}
else{
  this.isLoginForm = true
  this.signedUp = true
  setTimeout(()=>{
    this.signedUp = false
  },2000)
}
  }
}

