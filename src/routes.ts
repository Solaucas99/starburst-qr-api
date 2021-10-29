import { Router } from 'express';

// CognitoService
import { signUpController } from './services/cognito/useCases/signUpUser/index';
import { loginController } from './services/cognito/useCases/loginUser/index';
import { getUserController } from './services/cognito/useCases/getUser/index';
import { updateUserAttrController } from './services/cognito/useCases/updateUserAttributes/index';

import { resendVerificationCodeController } from './services/cognito/useCases/resendVerificationCode/index';
import { verifyEmailCodeController } from './services/cognito/useCases/verifyEmailCode/index';

// Middlewares
import { requireLogin } from './middlewares/requireLogin';
import { requireEmailConfirmed } from './middlewares/requireEmailConfirmed';

//Controllers Visitors
import { createVisitorController } from './app/useCases/Visitors/CreateVisitor/';
import { deleteVisitorController } from './app/useCases/Visitors/DeleteVisitor/';
import { findAllVisitorController } from './app/useCases/Visitors/FindAllVisitors';
import { findVisitorController } from './app/useCases/Visitors/FindVisitor';
import { confirmVisitorMailController } from './app/useCases/Visitors/ConfirmVisitorMail';
import { updateVisitorController } from './app/useCases/Visitors/UpdateVisitor';

//Controllers Visits
import { findVisitController } from './app/useCases/Visits/FindVisits/';
import { findAllVisitsController } from './app/useCases/Visits/FindAllVisits/';
import { deleteVisitController } from './app/useCases/Visits/DeleteVisit/';
import { createVisitController } from './app/useCases/Visits/CreateVisit';
import { confirmVisitMailController } from './app/useCases/Visits/ConfirmVisitMail';

//Controllers Visitors Link Generation
import { createVisitorLinkController } from './app/useCases/Visitors/CreateVisitorLink';
import { validateVisitorLinkController } from './app/useCases/Visitors/ValidateVisitorLink';

//Controllers Update Visitors Link Generation
import { createUpdateVisitorLinkController } from './app/useCases/Visitors/CreateUpdateVisitorLink';
import { validateUpdateVisitorLinkController } from './app/useCases/Visitors/ValidateUpdateVisitorLink';
import { respondChallengeController } from './services/cognito/useCases/respondChallenge';
import { refreshTokenController } from './services/cognito/useCases/refreshToken';

const routes = Router();

// -------- Cognito -------
// Get User
routes.get('/user', requireLogin, getUserController.getUser);

// Login
routes.post('/login', loginController.handle);

// Signup
// routes.post('/signup', signUpController.handleSignUp);

// ConfirmSignUp
routes.post(
  '/signup/confirm',
  requireLogin,
  signUpController.handleUserSignUpConfirm,
);

// Resend Email Verification Code
routes.post(
  '/auth/code/resend',
  requireLogin,
  resendVerificationCodeController.handle,
);

// Verify Email code
routes.post(
  '/auth/code/verify',
  requireLogin,
  verifyEmailCodeController.handle,
);

// Challenge
routes.post('/login/challenge/', respondChallengeController.handle);

// RefreshToken
routes.post('/auth/keys/refresh', refreshTokenController.handle);

// Update UserAttr
routes.put(
  '/user/update',
  requireLogin,
  requireEmailConfirmed,
  updateUserAttrController.handleUserUpdate,
);

// Update User Confirm
routes.put(
  '/user/update/confirm',
  requireLogin,
  updateUserAttrController.handleUserUpdateConfirm,
);

// ----- Visitors ------

//Find All
routes.get(
  '/visitors/all',
  requireLogin,
  findAllVisitorController.findAllVisitor,
);

// Register
routes.post('/visitors/register', createVisitorController.createVisitor);

// Find One - req.query
routes.get('/visitors', requireLogin, findVisitorController.findVisitor);

// Find One
routes.get('/visitors/:id', requireLogin, findVisitorController.findVisitor);

// Update
routes.put(
  '/visitors/:id',
  requireLogin,
  updateVisitorController.updateVisitor,
);

// Delete
routes.delete(
  '/visitors/:id',
  requireLogin,
  requireEmailConfirmed,
  deleteVisitorController.deleteVisitor,
);

// ConfirmEmail
routes.post(
  '/confirmvisitor/:id',
  confirmVisitorMailController.confirmVisitorMail,
);

// ------ Visits ------

//Find All
routes.get('/visits/all', requireLogin, findAllVisitsController.findAllVisits);

// Register
routes.post(
  '/visits/create',
  requireLogin,
  requireEmailConfirmed,
  createVisitController.createVisit,
);

// Find One - Req.query
routes.get('/visits', requireLogin, findVisitController.findVisit);

// Find One
routes.get('/visits/:id', requireLogin, findVisitController.findVisit);

// Delete One
routes.delete(
  '/visits/delete/:id',
  requireLogin,
  requireEmailConfirmed,
  deleteVisitController.deleteVisit,
);

//ConfirmVisit
routes.get(
  '/visits/confirmvisit/:id',
  requireLogin,
  requireEmailConfirmed,
  confirmVisitMailController.confirmVisitMail,
);

// ------ Visitors Link Generation ------

// Register
routes.post(
  '/visitors/generate-link',
  requireLogin,
  requireEmailConfirmed,
  createVisitorLinkController.createVisitorLink,
);

// Validate
routes.post(
  '/visitors/validate-link/:id',
  validateVisitorLinkController.validateVisitorLink,
);

// ------ Update Visitors Link Generation ------

// Register
routes.post(
  '/visitors/update/generate-link',
  requireLogin,
  requireEmailConfirmed,
  createUpdateVisitorLinkController.createUpdateVisitorLink,
);

// Validate
routes.post(
  '/visitors/update/validate-link/:id',
  validateUpdateVisitorLinkController.validateUpdateVisitorLink,
);

// ----------- 404 ------------

// 404
routes.get('*', (req, res) => {
  res.status(404).json({ message: 'Página não encontrada.' });
});

export default routes;
