/**
 * メモのエンティティ
 *
 * @export
 * @interface Memo
 */
export interface Memo {
  id: string;
  title: string;
  description: string;
  folderId: string;
  createdUser: string;
  createdDate: any;
  updatedDate: any;
}
