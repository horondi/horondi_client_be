const { gql } = require('@apollo/client');
const client = require('../../utils/apollo-test-client');

const createUser = async ({ firstName, lastName, email, password, language }) => {
  await client.mutate({
    mutation: gql`
      mutation(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $language: Int!
      ) {
        registerUser(
          user: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
          }
          language: $language
        ) {
          _id
          firstName
          lastName
          email
          role
          registrationDate
          credentials {
            tokenPass
          }
        }
      }
    `,
    variables: {
      firstName,
      lastName,
      email,
      password,
      language,
    },
  });
};

const getAllUsers = async (token = null, sort = {}, filter = {}) => {
  const result = await client.query({
    query: gql`
      query($sort: UserSortInput, $filter: UserFilterInput) {
        getAllUsers(sort: $sort, filter: $filter) {
          items {
            _id
            firstName
            email
            role
            banned
          }
        }
      }
    `,
    variables: {
      sort,
      filter,
    },
    context: {
      headers: {
        token: token,
      },
    },
  });

  return await result.data.getAllUsers.items;
};

const chooseOnlyUsers = (arr) => {
  return arr.filter(user => user.role === CNST.roles.USER);
};


module.exports = {
  createUser,
  getAllUsers,
  chooseOnlyUsers
}