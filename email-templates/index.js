const { EmailActions } = require('../consts/email-actions');

const htmlTemplates = {
  [EmailActions.CONFIRM_EMAIL]: {
    subject: '[HORONDI] Email confirmation',
    templateFileName: 'confirm-email',
  },
  [EmailActions.RECOVER_PASSWORD]: {
    subject: '[HORONDI] Instructions for password recovery',
    templateFileName: 'recover-password',
  },
  [EmailActions.SUCCESSFUL_CONFIRM]: {
    subject: '[HORONDI] Successful email confirmation',
    templateFileName: 'successful-confirm',
  },
  [EmailActions.BLOCK_USER]: {
    subject: '[HORONDI] Blocked user',
    templateFileName: 'block-user',
  },
  [EmailActions.UNLOCK_USER]: {
    subject: '[HORONDI] Unlocked user',
    templateFileName: 'unlock-user',
  },
  [EmailActions.INCOMPLETE_OPERATIONS_CART]: {
    subject: '[HORONDI] Incomplete operations in cart',
    templateFileName: 'incomplete-operations',
  },
  [EmailActions.PRODUCT_AVAILABLE_AGAIN_WISHLIST]: {
    subject: '[HORONDI] Product in wishlist is available again',
    templateFileName: 'product-is-available-again',
  },
  [EmailActions.SUCCESSFUL_ORDER]: {
    subject: '[HORONDI] Successful made order',
    templateFileName: 'successful-order',
  },
  [EmailActions.CONFIRM_ADMIN_EMAIL]: {
    subject: '[HORONDI] Invitation to become an admin',
    templateFileName: 'confirm-admin-email',
  },
  [EmailActions.PAYMENT_ORDER]: {
    subject: '[HORONDI] Pay for your order',
    templateFileName: 'payment-order',
  },
  [EmailActions.CONFIRM_CREATION_SUPERADMIN_EMAIL]: {
    subject: '[HORONDI] Confirmation creating superadmin',
    templateFileName: 'confirm-creation-superadmin-email',
  },
  [EmailActions.SEND_EMAIL_ANSWER]: {
    subject: '[HORONDI] Your question has been answered',
    templateFileName: 'answer-email-question',
  },
};

module.exports = { htmlTemplates };
