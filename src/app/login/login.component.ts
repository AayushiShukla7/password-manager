import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../_services/password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isError: boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {}

  onSubmit(values: any) {
    this.passwordManagerService.login(values.email, values.password)
      .then(() => {
        //console.log('Login Success');
        //this.router.navigate(['/site-list']);
        this.router.navigateByUrl('/site-list');
      })
      .catch(err => {
        this.isError = true;
      });
  }

}
