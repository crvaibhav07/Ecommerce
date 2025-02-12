import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

   onSucessfulLogin(){
    this.isLoggedIn = true
  }

  onLoginPageLoad(){
    this.isLoggedIn = false
  }
 

}
