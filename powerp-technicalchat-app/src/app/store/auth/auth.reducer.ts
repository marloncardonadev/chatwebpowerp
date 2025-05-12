import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { User } from '../../core/models/user.model';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logout, state => ({ ...state, user: null }))
);