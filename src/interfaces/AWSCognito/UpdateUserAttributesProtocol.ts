export interface UpdateUserAttributesProtocol {
  accessToken: string;
  attribute: {
    Name: 'name' | 'nickname' | 'email';
    Value: string;
  };
}
