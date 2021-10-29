export interface ConfirmUpdateUserAttrProtocol {
  acc_token: string;
  attribute: 'email' | 'phone_number';
  confirmation_code: string;
}
