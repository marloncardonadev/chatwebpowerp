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
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['styles.component.scss'],
  imports:[MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule]
})
export class RegisterComponent {
  imageCatalog: string[] = [
    './avatars/avatar1.png',
    './avatars/avatar2.png',
    './avatars/avatar3.png',
    './avatars/avatar4.png',
    './avatars/avatar5.png',
    './avatars/avatar6.png',
    './avatars/avatar7.png',
    './avatars/avatar8.png',
    './avatars/avatar9.png',
    './avatars/avatar10.png'
  ];

  nickname = '';
  name = '';
  imageUrl = '';

  constructor(private api: ApiService, private store: Store, private router: Router) {}

  onRegister() {
    this.api.register({ nickname: this.nickname, name: this.name, imageUrl: this.imageUrl })
      .subscribe({
        next: user => {
                this.store.dispatch(loginSuccess({ user }));
                this.router.navigate(['chat']);
              },
        error: err => alert(err.error)
      });
  }
}