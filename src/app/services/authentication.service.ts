import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User, auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {}

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public getCurrentUser(): User {
    return this.afAuth.auth.currentUser;
  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  public getUser(): Observable<User> {
    return this.afAuth.user;
  }
}
