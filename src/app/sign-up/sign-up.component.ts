import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../validation/custom-validator';
import { SpinnerService } from '../services/spinner.service';
import { AuthenticationService } from '../services/authentication.service';

/**
 * アカウント登録画面コンポーネント
 *
 * @export
 * @class SignUpComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // FormGroup定義
  public signUpFormGroup: FormGroup;
  public userNameControl: FormControl;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;

  public apiErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit() {
    this.createForm();
    this.userNameControl = this.signUpFormGroup.get('userName') as FormControl;
    this.emailControl = this.signUpFormGroup.get('email') as FormControl;
    this.passwordControl = this.signUpFormGroup.get('password') as FormControl;
    this.confirmPasswordControl = this.signUpFormGroup.get(
      'confirmPassword'
    ) as FormControl;
  }

  /**
   * アカウント登録ボタン押下時に呼び出し
   *
   */
  public async onSubmit() {
    this.spinnerService.show();
    try {
      const created = await this.authenticationService.createUserWithEmailAndPassword(
        this.emailControl.value,
        this.passwordControl.value
      );
      const newUser = created.user;
      // 作成したアカウントにdisplayNameを設定する
      await newUser.updateProfile({
        displayName: this.userNameControl.value,
        photoURL: ''
      });
      // アカウント登録処理が成功したらログイン画面に戻る
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      this.apiErrorMessage = error ? error.message : undefined;
    } finally {
      this.spinnerService.hide();
    }
  }

  /**
   * ユーザーネームフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToUserName() {
    return this.userNameControl.hasError('required')
      ? 'ニックネームは必須です'
      : '';
  }

  /**
   * Eメールフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToEmail() {
    return this.emailControl.hasError('required')
      ? 'メールアドレスは必須です'
      : this.emailControl.hasError('email')
      ? '正しいメールアドレスの形式ではありません'
      : '';
  }

  /**
   * パスワードにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToPassword() {
    return this.passwordControl.hasError('required')
      ? 'パスワードは必須です'
      : '';
  }

  /**
   * 確認用パスワードにバリデーションエラーメッセージを表示する
   *
   * @returns
   * @memberof SignUpComponent
   */
  public getErrorMessageToConfirmPassword() {
    return this.confirmPasswordControl.hasError('required')
      ? '確認用パスワードは必須です'
      : this.confirmPasswordControl.hasError('notMatchPassword')
      ? 'パスワードが一致していません'
      : '';
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.signUpFormGroup = this.fb.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        // パスワードと確認パスワードが一致しているか確認するバリデーション
        validator: CustomValidator.matchPassword
      }
    );
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

  /**
   * Facebook認証でログイン
   *
   * @memberof LoginComponent
   */
  public async signInWithFacebook() {
    try {
      await this.authenticationService.signInWithFacebook();
      // ログインに成功したらホーム画面に遷移する
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
