import { Component } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { loginSuccess } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: 'login.component.html',
  styleUrls: ['styles.component.scss'],
  imports:[MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  providers:[ApiService]
})
export class LoginComponent {
  nickname = '';

  constructor(private api: ApiService, private store: Store, private router: Router) {}

  onLogin() {
    const loginDto = {
      nickname: this.nickname
    }
    this.api.login(loginDto).subscribe({
      next: user => {
        this.store.dispatch(loginSuccess({ user }));
        this.router.navigate(['chat']);
      },
      error: err => {
        this.router.navigate(['register']);
      }
    });
  }
}