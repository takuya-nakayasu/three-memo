import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CustomValidator } from '../validation/custom-validator';

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
    private afAuth: AngularFireAuth,
    private router: Router
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
  public onSubmit() {
    this.afAuth.auth
      // Firebaseのアカウント登録処理の呼び出し
      .createUserWithEmailAndPassword(
        this.emailControl.value,
        this.passwordControl.value
      )
      .then(created => {
        const newUser = created.user;
        // 作成したアカウントにdisplayNameを設定する
        newUser
          .updateProfile({
            displayName: this.userNameControl.value,
            photoURL: ''
          })
          .then(() => {
            // アカウント登録処理が成功したらログイン画面に戻る
            this.router.navigate(['/login']);
          });
      })
      .catch(error => {
        console.log(error);
        this.apiErrorMessage = error ? error.message : undefined;
      });
  }

  /**
   * ユーザーネームフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToUserName() {
    return this.userNameControl.hasError('required')
      ? 'You must enter a value'
      : '';
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
   * Eメールフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToPassword() {
    return this.passwordControl.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  public getErrorMessageToConfirmPassword() {
    return this.confirmPasswordControl.hasError('required')
      ? 'You must enter a value'
      : this.confirmPasswordControl.hasError('notMatchPassword')
      ? 'Password and confirm password do not match'
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
}
