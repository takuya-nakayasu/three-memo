import { AbstractControl } from '@angular/forms';

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
  public static titleOrDescriptionRequired(ac: AbstractControl) {
    const title = ac.get('title').value;
    const description = ac.get('description').value;
    if (!title && !description) {
      // titleとdescriptionの両方に何も入力されていない場合
      ac.get('title').setErrors({ notTitleOrDescriptionRequired: true });
    }
  }
}
