import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';
import { AuthenticationService } from '../services/authentication.service';

/**
 * ログイン画面コンポーネント
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // FormGroup定義
  public loginFormGroup: FormGroup;
  // emailフォームのコントロール定義
  public emailControl: FormControl;
  // passwordフォームのコントロール定義
  public passwordControl: FormControl;

  public apiErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // tslint:disable-next-line:variable-name
    private _toastService: ToastService,
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit() {
    this.createForm();
    this.emailControl = this.loginFormGroup.get('email') as FormControl;
    this.passwordControl = this.loginFormGroup.get('password') as FormControl;
  }

  /**
   * ログインボタン押下時に呼び出し
   *
   */
  public async onSubmit() {
    try {
      this.spinnerService.show();
      // メールアドレスとパスワードをFirebase Authenticationに渡す
      await this.authenticationService.signInWithEmailAndPassword(
        this.emailControl.value,
        this.passwordControl.value
      );
      // ログインに成功したらホーム画面に遷移する
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
      this._toastService.open(
        'ログインに失敗しました。エラーメッセージを確認してください。'
      );
      this.apiErrorMessage = error ? error.message : undefined;
    } finally {
      this.spinnerService.hide();
    }
  }

  /**
   * Eメールフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToEmail() {
    return this.emailControl.hasError('required')
      ? 'You must enter a value'
      : this.emailControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  /**
   * パスワードフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToPassword() {
    return this.passwordControl.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Twitter認証でログイン
   *
   * @memberof LoginComponent
   */
  public async signInWithTwitter() {
    try {
      await this.authenticationService.signInWithTwitter();
      // ログインに成功したらホーム画面に遷移する
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
