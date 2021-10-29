export type GetUserResponse =
  AWS.CognitoIdentityServiceProvider.GetUserResponse;

export interface GetUserProviderProtocol {
  getUser(acc_token: string): Promise<GetUserResponse>;
}
