import {compareArray, isNumeric} from '../Helpers'
import ValidateParcel from './ValidateParcel'
import ValidateAddress from './ValidateAddress'
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
      try {
        ValidateAddress.valid(rate.address_from)
        ValidateAddress.valid(rate.address_to)
        ValidateParcel.valid(rate.parcel)
      } catch(e) {
        throw new ValidateRateException(e.message)
      }
    }
    return true
  }
}
export default new ValidateRate()
