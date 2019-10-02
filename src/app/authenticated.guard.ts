import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';

/**
 * ログイン済のアカウントをログイン・アカウント登録画面に、
 * 遷移させない
 *
 * @export
 * @class AuthenticatedGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afAuth.user.pipe(
      take(1),
      map(user => {
        if (user != null) {
          // ログインしていた場合はホーム画面に遷移する
          this.router.navigate(['/home']);
          return false;
        } else {
          // ログインしていない場合は遷移を許可する
          return true;
        }
      })
    );
  }
}
