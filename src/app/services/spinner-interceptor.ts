import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
  });

  constructor(private overlay: Overlay) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.attach(new ComponentPortal(MatSpinner));
    setTimeout(() => {
      // ローディング終了
      this.spinner.detach();
    }, 3000);
    // 何もせず次の処理に引き渡す
    return next.handle(req);
  }
}
