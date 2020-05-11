import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidator {
  // パスワードと確認用パスワードが一致するかチェック
  public static matchPassword(ac: AbstractControl) {
    const password = ac.get('password').value;
    const passwordConfirm = ac.get('confirmPassword').value;
    if (password !== passwordConfirm) {
      ac.get('confirmPassword').setErrors({ notMatchPassword: true });
    }
  }

  /**
   * 「タイトルと本文のどちらかは必須」バリデーション
   *
   * @static
   * @param {*} ac
   * @param {*} AbstractControl
   * @memberof CustomValidator
   */
  public static titleOrDescriptionRequired(
    control: FormGroup
  ): ValidationErrors | null {
    const title = control.get('title').value;
    const description = control.get('description').value;
    return !title && !description
      ? { notTitleOrDescriptionRequired: true }
      : null;
  }
}
