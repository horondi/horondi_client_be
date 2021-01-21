const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
} = require('../../dotenvValidator');
const { gql } = require('@apollo/client');
const { setupApp } = require('../helper-functions');

const materialDoesNotExistId = '1f2ad410eb01783384e6111b';
const graphqlErrorMessage = 'Skip value must be non-negative, but received: -5';

const skip = 0;
const wrongSkip = -5;
const wrongLimit = -3;
const limit = 2;
const limitZero = 0;

const user = {
  email: SUPER_ADMIN_EMAIL,
  password: SUPER_ADMIN_PASSWORD,
};

const createColor = async color => {
  const operations = await setupApp();
  const createdColor = await operations.mutate({
    mutation: gql`
      mutation($color: ColorInput!) {
        addColor(data: $color) {
          ... on Color {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    variables: { color },
  });
  return createdColor.data.addColor._id;
};

const deleteMaterial = async materialId => {
  const operations = await setupApp();
  const res = await operations.mutate({
    mutation: gql`
      mutation($id: ID!) {
        deleteMaterial(id: $id) {
          ... on Material {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    variables: { id: materialId },
  });

  return res;
};
const getMaterial = colorId => ({
  name: [
    { lang: 'uk', value: 'Матеріал test' },
    { lang: 'en', value: 'Material test' },
  ],
  ...materialOptions,
  colors: [colorId],
});

const getMaterialForMutation = colorId => ({
  name: [
    { lang: 'uk', value: 'Матеріал test2' },
    { lang: 'en', value: 'Material test2' },
  ],
  ...materialOptions,
  colors: [colorId],
});

const getMaterialToUpdate = colorId => ({
  name: [
    { lang: 'uk', value: 'Матеріал update' },
    { lang: 'en', value: 'Material update' },
  ],
  ...materialOptions,
  colors: [colorId],
});

const materialOptions = {
  description: [
    { lang: 'uk', value: 'Опис update' },
    { lang: 'en', value: 'Description update' },
  ],
  purpose: 'update',
  available: true,
};

const color = {
  name: [
    { lang: 'uk', value: 'Тестовий колір test' },
    { lang: 'en', value: 'Test color test' },
  ],
  colorHex: 'colorHex test',
  simpleName: [
    { lang: 'uk', value: 'Проста назва кольору test' },
    { lang: 'en', value: 'Simple color name test' },
  ],
};

module.exports = {
  materialDoesNotExistId,
  graphqlErrorMessage,
  skip,
  wrongSkip,
  wrongLimit,
  limit,
  limitZero,
  user,
  createColor,
  color,
  getMaterial,
  getMaterialForMutation,
  getMaterialToUpdate,
  deleteMaterial,
};
