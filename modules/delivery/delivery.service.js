const request = require('request');
const util = require('util')
const post = util.promisify(request.post)
const { 
    CITY_NOT_FOUND,
    WAREHOUSE_NOT_FOUND,
 } = require('../../error-messages/delivery.message')

class NovaPoshtaService {
  async getNovaPoshtaCities(city){  
      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'Address',
              calledMethod: 'getCities',
              methodProperties: {
                  FindByString: city
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      if(res.body.errors.lenght) {
          throw new Error(CITY_NOT_FOUND)
      }
      return res.body.data.slice(0, 10);
  }

  async getNovaPoshtaStreet(CityRef, street) {
      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'Address',
              calledMethod: 'getStreet',
              methodProperties: {
                  CityRef,
                  FindByString: street
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      return res.body.data.slice(0, 10)
  }

  async getNovaPoshtaWarehouses(city){  
      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'AddressGeneral',
              calledMethod: 'getWarehouses',
              methodProperties: {
                  CityName: city
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      if(res.body.errors.lenght) {
          throw new Error(WAREHOUSE_NOT_FOUND)
      }
      return res.body.data.slice(0, 10);
  }

  async getNovaPoshtaPrice(data) {
      const {
          CitySender = 'db5c88f5-391c-11dd-90d9-001a92567626',
          CityRecipient,
          Weight,
          ServiceType,
          Cost,
          CargoType = 'Cargo',
          SeatsAmount = 1,
      } = data

      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'InternetDocument',
              calledMethod: 'getDocumentPrice',
              methodProperties: {
                  CitySender,
                  CityRecipient,
                  Weight,
                  ServiceType,
                  Cost,
                  CargoType,
                  SeatsAmount,
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      return res.body.data
  }
  
  async createNovaPoshtaOrder(data) {
      const {
          CitySender = 'db5c88f5-391c-11dd-90d9-001a92567626',
          Weight,
          PayerType = 'Sender',
          PaymentMethod = 'Cash',
          ServiceType = 'WarehouseWarehouse',
          Cost,
          CargoType = 'Parcel',
          SeatsAmount = 1,
          Description,
          RecipientCityName,
          RecipientAddressName,
          RecipientName = 'Тест Тест Тест',
          RecipientType = 'PrivatePerson',
          RecipientsPhone,
          RecipientArea = '',
          RecipientAreaRegions = '',
          RecipientHouse = '',
          RecipientFlat = '',
      } = data

      const sender = await this.getSenderCounterparty()

      const address = await this.getSenderAddress(CitySender)
      
      const contactSender = await this.getSenderContact(sender.Ref)

      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'InternetDocument',
              calledMethod: 'save',
              methodProperties: {
                  NewAddress:'1',
                  CitySender,
                  Weight,
                  ServiceType,
                  Cost,
                  CargoType,
                  SeatsAmount,
                  Description,
                  RecipientCityName,
                  RecipientAddressName,
                  RecipientName,
                  RecipientType,
                  RecipientsPhone,
                  PayerType,
                  PaymentMethod,
                  RecipientArea,
                  RecipientAreaRegions,
                  RecipientHouse,
                  RecipientFlat,
                  Sender:sender.Ref,
                  SenderAddress:address.Ref,
                  ContactSender:contactSender.Ref,
                  SendersPhone: contactSender.Phones,
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      return res.body.data[0]
  }

  async getSenderCounterparty() {
      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'Counterparty',
              calledMethod: 'getCounterparties',
              methodProperties: {
                  CounterpartyProperty: 'Sender',
                  Page: '1'
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );

      return res.body.data[0]
  }

  async getSenderAddress(CityRef) {
      const sender = await this.getSenderCounterparty()
      
      const street = await this.getNovaPoshtaStreet(CityRef, 'Литвиненка')

      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'Address',
              calledMethod: 'save',
              methodProperties: {
                  CounterpartyRef: sender.Ref,
                  StreetRef: street[0].Ref,
                  BuildingNumber: '8',
                  Flat: '1', 
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );
          
      return res.body.data[0]
  }

  async getSenderContact(Sender) {
      const res = await post(
          process.env.NOVA_POSHTA_API_LINK,
          { 
            json: true,
            body: {
              modelName: 'Counterparty',
              calledMethod: 'getCounterpartyContactPersons',
              methodProperties: {
                  Ref: Sender,
                  Page: '1'
              },
              apiKey: process.env.NOVA_POSHTA_API_KEY
            }
          },
      );
          
      return res.body.data[0]
  }
}

module.exports = new NovaPoshtaService()