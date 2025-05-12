import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule, AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ]
})
export class AppModule {}