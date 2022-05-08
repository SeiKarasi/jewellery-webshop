import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login(){
   this.loading = true;
   this.authService.login(this.email.value, this.password.value)
   .then(cred => {
    const interval = setTimeout(() => {
      clearInterval(interval)
      this.router.navigateByUrl('/main');
      this.loading = false;
    }, 3000);
     
   }).catch(error => {
     console.error(error);
     this.loading = false;
   });
  }


  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe;
  }
}
