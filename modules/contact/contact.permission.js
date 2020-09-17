const { allow } = require('graphql-shield');
const { isAuthorizedAdmin } = require('../../utils/rules');

const contactPermissionsQuery = {
  getContacts: allow,
  getContactById: allow,
};

const contactPermissionsMutations = {
  addContact: allow,
  deleteContact: isAuthorizedAdmin,
  updateContact: isAuthorizedAdmin,
};

module.exports = { contactPermissionsQuery, contactPermissionsMutations };
