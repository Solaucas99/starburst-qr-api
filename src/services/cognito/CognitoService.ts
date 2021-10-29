// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';
// // import { SignUpUserProtocol } from '../interfaces/AWSCognito/SignUpUserProtocol';
// // import { ConfirmUserSignUpProtocol } from '../interfaces/AWSCognito/ConfirmUserSignUpProtocol';
// // import { LoginUserProtocol } from '../interfaces/AWSCognito/LoginUserProtocol';
// // import { UpdateUserAttributesProtocol } from '../interfaces/AWSCognito/UpdateUserAttributesProtocol';
// // import { UpdateUserPasswordProtocol } from '../interfaces/AWSCognito/UpdateUserPasswordProtocol';
// // import { RecoverUserPasswordProtocol } from '../interfaces/AWSCognito/RecoverUserPasswordProtocol';
// // import { ConfirmUpdateUserAttributes } from '../interfaces/AWSCognito/ConfirmUpdateUserAttributes';

// class CognitoService {
//   private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
//   private _errors: Array<Error | string> = [];

//   constructor() {
//     dotenv.config();
//     this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
//       region: process.env.AWS_REGION,
//     });
//   }

//   public get errors(): Array<Error | string> {
//     return this._errors;
//   }

//   // This method receive a username on parameter and return his group (require dev credentials in ambient variable)
//   public async getUserGroup(
//     username: string,
//   ): Promise<AWS.CognitoIdentityServiceProvider.AdminListGroupsForUserResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .adminListGroupsForUser({
//           UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string,
//           Username: username,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // this method confirm the user recover password
//   public async confirmRecoverUserPassword(
//     recoverAttr: RecoverUserPasswordProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.ConfirmForgotPasswordResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .confirmForgotPassword({
//           ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
//           ConfirmationCode: recoverAttr.confirmationCode,
//           Username: recoverAttr.username,
//           Password: recoverAttr.password,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // this method send a code to user recover the password of their account
//   public async recoverUserPassword(
//     username: string,
//   ): Promise<AWS.CognitoIdentityServiceProvider.ForgotPasswordResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .forgotPassword({
//           ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
//           Username: username,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // this method update the password of user
//   public async updateUserPassword(
//     updateAttr: UpdateUserPasswordProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.ChangePasswordResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .changePassword({
//           AccessToken: updateAttr.accessToken,
//           PreviousPassword: updateAttr.prevPassword,
//           ProposedPassword: updateAttr.newPassword,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // this method confirm the mail or phone user attribute, after a update attribute request
//   public async updateUserAttributesConfirmation(
//     confirmAttr: ConfirmUpdateUserAttributes,
//   ): Promise<AWS.CognitoIdentityServiceProvider.VerifyUserAttributeResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .verifyUserAttribute({
//           AccessToken: confirmAttr.accessToken,
//           AttributeName: confirmAttr.attribute,
//           Code: confirmAttr.confirmationCode,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // This method update user attributes, need code confirmation if attribute is email or phone
//   public async updateUserAttributes(
//     updateAttr: UpdateUserAttributesProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.UpdateUserAttributesResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .updateUserAttributes({
//           AccessToken: updateAttr.accessToken,
//           UserAttributes: [updateAttr.attribute],
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   //This method returns response object (like destination mail or something else) from signup cognito if don't get errors inside the sended attributes
//   public async signUpUser(
//     user: SignUpUserProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .signUp({
//           ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
//           Username: user.username,
//           Password: user.password,
//           UserAttributes: [
//             { Name: 'name', Value: user.name },
//             { Name: 'custom:cpf_number', Value: user.cpf_number },
//             { Name: 'email', Value: user.email },
//             { Name: 'nickname', Value: user.username },
//             { Name: 'phone_number', Value: user.phone_number },
//           ],
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // This method confirms the cognito user if don't get errors inside the sended attributes, need code confirmation
//   public async confirmSignUpUser(
//     confirmAttr: ConfirmUserSignUpProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .confirmSignUp({
//           ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
//           Username: confirmAttr.username,
//           ConfirmationCode: confirmAttr.confirmation_code,
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }

//   // This method authenticate user inside cognito and return the next challenge to confirm data or return the access tokens and id tokens
//   public async loginUser(
//     authAttr: LoginUserProtocol,
//   ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
//     try {
//       const data = await this.cognitoIdentity
//         .initiateAuth({
//           AuthFlow: process.env.AWS_COGNITO_AUTH_FLOW as string,
//           ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
//           AuthParameters: {
//             USERNAME: authAttr.username,
//             PASSWORD: authAttr.password,
//           },
//         })
//         .promise();

//       if (data.$response.error) {
//         this._errors.push(data.$response.error.message);
//         throw new Error(data.$response.error.message);
//       }

//       return data;
//     } catch (err) {
//       this._errors.push(err.message);
//       throw new Error(err.message);
//     }
//   }
// }
// const cognitoTeste = new CognitoService();
// console.log(cognitoTeste.errors);
