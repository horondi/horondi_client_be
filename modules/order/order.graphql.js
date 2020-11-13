const orderTypes = `
type Order {
  _id: ID!
  status: Status,
  user: OrderUser
  dateOfCreation: String
  lastUpdatedDate: String
  adminComment: String
  userComment: String
  cancellationReason:  String
  delivery: Delivery
  address: Address
  items: [OrderItems]
  totalItemsPrice: [CurrencySet]
  totalPriceToPay: [CurrencySet]
  isPaid: Boolean
  paymentMethod: PaymentEnum
}
enum PaymentEnum {
  CARD
  CASH
}
enum Status {
  CREATED
  CONFIRMED 
  PRODUCED
  CANCELLED 
  REFUNDED 
  SENT
  DELIVERED
}
type OrderItems {
  category: [Language]
  subcategory: [Language]
  model: [Language]
  name: [Language]
  colors: [[Language]]
  pattern: [Language]
  closure: [Language]
  closureColor: String
  size: Size,
  bottomMaterial: [Language]
  bottomColor: [Language]
  additions: [[Language]]
  actualPrice: [CurrencySet]
  quantity: Int
}
type Delivery {
  sentOn: String
  sentBy: String
  invoiceNumber: String
  courierOffice: Int
  byCourier: Boolean
  cost: [CurrencySet]
}
type OrderUser {
  firstName: String
  lastName: String
  patronymicName: String
  email: String
  phoneNumber: String
}
`;
const orderInputs = ` 
input OrderInput {
  _id:ID!
  status: Status
  user: OrderUserInput,
  delivery: DeliveryInput,
  items: [OrderItemsInput],
  paymentMethod: PaymentEnum
  userComment: String
  adminComment: String
  cancellationReason: String
  address: AddressInput
  dateOfCreation: Date
  lastUpdatedDate: Date
  totalItemsPrice: [CurrencyInputSet]
  totalPriceToPay: [CurrencyInputSet]
  isPaid: Boolean
}

input OrderUserInput {
  firstName: String
  lastName: String
  email: String
  phoneNumber: String
  patronymicName: String
}

input CurrencyInputSet {
  currency: String!
  value: Float!
}

input DeliveryInput {
  sentOn: String
  sentBy: String
  invoiceNumber: String
  courierOffice: Int
  byCourier: Boolean
  cost: [CurrencyInputSet]!
}

input OrderItemsInput {
  category: [LanguageInput]
  subcategory: [LanguageInput]
  model: [LanguageInput]
  name: [LanguageInput]
  colors: [[LanguageInput]]
  pattern: [LanguageInput]
  closure: [LanguageInput]
  closureColor: String
  size: SizeInput,
  bottomMaterial: [LanguageInput]
  bottomColor: [LanguageInput]
  additions: [[LanguageInput]]
  actualPrice: [CurrencySetInput]
  quantity: Int
}
`;

module.exports = {
  orderInputs,
  orderTypes,
};
