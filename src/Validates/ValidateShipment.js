import {compareArray, isNumeric} from '../Helpers'
import ValidateParcel from './ValidateParcel'
import ValidateAddress from './ValidateAddress'
function ValidateShipmentShipmentException (message) {
  this.message = message
  this.name = "Validate shipment exception"
}

class ValidateShipment {
  constructor () {
    this.defaultShipment = {
      "rate": null,
      "address_from": {
          "name": null,
          "phone": null,
          "street": null,
          "district": null,
          "city": null
      },
      "address_to": {
          "name": null,
          "phone": null,
          "street": null,
          "district": null,
          "city": null
      },
      "parcel": {
          "cod": null,
          "weight": null,
          "mass_unit": null,
          "width": null,
          "height": null,
          "length": null,
          "distance_unit": null
      }
    }
  }

  valid (shipment) {
    let checkShipment = compareArray(Object.keys(this.defaultShipment), Object.keys(shipment))
    if (!checkShipment.status) {
      throw new ValidateShipmentShipmentException(`Missing ${checkShipment.value}`)
    } else {
      if (shipment.rate === null || shipment.rate === '') throw new ValidateShipmentShipmentException(`Value of rate can't empty`)
      try {
        ValidateAddress.valid(shipment.address_from)
        ValidateAddress.valid(shipment.address_to)
        ValidateParcel.valid(shipment.parcel)
      } catch(e) {
        throw new ValidateShipmentShipmentException(e.message)
      }
    }
    return true
  }
}
export default new ValidateShipment()
