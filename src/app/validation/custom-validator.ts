import { AbstractControl } from '@angular/forms';

export class CustomValidator {
  // パスワードと確認用パスワードが一致するかチェック
  static matchPassword(ac: AbstractControl) {
    const password = ac.get('password').value;
    const passwordConfirm = ac.get('confirmPassword').value;
    if (password !== passwordConfirm) {
      ac.get('confirmPassword').setErrors({ notMatchPassword: true });
    }
  }
}
