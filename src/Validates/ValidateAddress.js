import {compareArray, isNumeric} from '../Helpers'
function ValidateAddressException (message) {
  this.message = message
  this.name = "Validate address exception"
}

class ValidateAddress {
  constructor () {
    this.defaultAddress = {
      "name": null,
      "phone": null,
      "street": null,
      "district": null,
      "city": null
    }
  }
  valid (address) {
    let checkAddress = compareArray(Object.keys(this.defaultAddress), Object.keys(address))

    if (!checkAddress.status) {
      throw new ValidateAddressException(`Missing ${checkAddress.value}`)
    } else {
      for (const key of Object.keys(address)) {
        switch (key) {
          case 'city':
          case 'district':
            if (address[key] === null || address[key] === '') throw new ValidateAddressException(`Value of ${key} can't empty`)
            if (!isNumeric(address[key])) throw new ValidateAddressException(`Value of ${key} invalid`)
            break
          default:
            if (this.defaultAddress.hasOwnProperty(key)) {
              if (address[key] === null || address[key] === '') throw new ValidateAddressException(`Value of ${key} can't empty`)
            }
            break;
        }
      }
    }
  }
}
export default new ValidateAddress()
