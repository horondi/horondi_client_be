const rateType = `
type Rate {
_id: ID!
rate: Int!
lastUpdatedDate: String!
user: User
product: Product
show: Boolean
}
`;

const rateInput = `
input rateInput {
  rate: Int
  product: ID!
  show: Boolean!
}`;

module.exports = {
  rateType,
  rateInput,
};
