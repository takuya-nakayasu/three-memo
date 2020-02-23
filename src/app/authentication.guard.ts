import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';

/**
 * ログインしていないアカウントをログイン画面に遷移させる
 *
 * @export
 * @class AuthenticationGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.afAuth.user.pipe(
      take(1),
      map(user => {
        if (user != null) {
          // ログインしていた場合userにユーザーの情報が入る
          return true;
        } else {
          // ログインしていない場合はログイン画面に遷移する
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
