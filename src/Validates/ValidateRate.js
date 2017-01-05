import {compareArray, isNumeric} from '../Helpers'
import ValidateParcel from './ValidateParcel'
function ValidateRateException (message) {
  this.message = message
  this.name = "Validate rate exception"
}

class ValidateRate {
  constructor () {
    this.defaultRate = {
      "address_from": {
        "city": null,
        "district": null
      },
      "address_to": {
        "city": null,
        "district": null
      },
      "parcel": {
        "cod": null,
        "length": null,
        "width": null,
        "height": null,
        "weight": null,
        "mass_unit": null,
        "distance_unit": null
      }
    }
  }
  valid (rate) {
    let checkRate = compareArray(Object.keys(this.defaultRate), Object.keys(rate))
    if (!checkRate.status) {
      throw new ValidateRateException(`Missing ${checkRate.value}`)
    } else {
      let checkAddressFrom = compareArray(Object.keys(this.defaultRate.address_from), Object.keys(rate.address_from))
      let checkAddressTo = compareArray(Object.keys(this.defaultRate.address_to), Object.keys(rate.address_to))

      if (!checkAddressFrom.status) {
        throw new ValidateRateException(`Missing address_from.${checkAddressFrom.value}`)
      } else {
        for (const key of Object.keys(rate.address_from)) {
          if (this.defaultRate.address_from.hasOwnProperty(key)) {
            if (rate.address_from[key] === null || rate.address_from[key] === '') throw new ValidateRateException(`Value of address_from.${key} can't empty`)
            if (!isNumeric(rate.address_from[key])) throw new ValidateRateException(`Value of address_from.${key} invalid`)
          }
        }
      }

      if (!checkAddressTo.status) {
        throw new ValidateRateException(`Missing address_from.${checkAddressTo.value}`)
      } else {
        for (const key of Object.keys(rate.address_to)) {
          if (this.defaultRate.address_to.hasOwnProperty(key)) {
            if (rate.address_to[key] === null || rate.address_to[key] === '') throw new ValidateRateException(`Value of address_to.${key} can't empty`)
            if (!isNumeric(rate.address_to[key])) throw new ValidateRateException(`Value of address_to.${key} invalid`)
          }
        }
      }
      try {
        ValidateParcel.valid(rate.parcel)
      } catch(e) {
        throw new ValidateRateException(e.message)
      }
    }
    return true
  }
}
export default new ValidateRate()
