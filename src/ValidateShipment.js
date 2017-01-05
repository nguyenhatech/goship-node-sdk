import {compareArray, isNumeric} from './functions'
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
      let checkAddressFrom = compareArray(Object.keys(this.defaultShipment.address_from), Object.keys(shipment.address_from))
      let checkAddressTo = compareArray(Object.keys(this.defaultShipment.address_to), Object.keys(shipment.address_to))
      let checkParcel = compareArray(Object.keys(this.defaultShipment.parcel), Object.keys(shipment.parcel))

      if (!checkAddressFrom.status) {
        throw new ValidateShipmentShipmentException(`Missing address_from.${checkAddressFrom.value}`)
      } else {
        for (const key of Object.keys(shipment.address_from)) {
          switch (key) {
            default:
              if (this.defaultShipment.address_from.hasOwnProperty(key)) {
                if (shipment.address_from[key] === null || shipment.address_from[key] === '') throw new ValidateShipmentShipmentException(`Value of address_from.${key} can't empty`)
              }
              break;
          }
        }
      }
      if (!checkAddressTo.status) {
        throw new ValidateShipmentShipmentException(`Missing address_to.${checkAddressTo.value}`)
      } else {
        for (const key of Object.keys(shipment.address_to)) {
          switch (key) {
            default:
              if (this.defaultShipment.address_to.hasOwnProperty(key)) {
                if (shipment.address_to[key] === null || shipment.address_to[key] === '') throw new ValidateShipmentShipmentException(`Value of address_to.${key} can't empty`)
              }
              break;
          }
        }
      }
      if (!checkParcel.status) {
        throw new ValidateShipmentShipmentException(`Missing parcel.${checkParcel.value}`)
      } else {
        for (const key of Object.keys(shipment.parcel)) {
          switch (key) {
            case 'mass_unit':
              if (['g', 'kg'].indexOf(shipment.parcel.mass_unit) === -1) {
                throw new ValidateShipmentShipmentException(`Value of parcel.mass_unit invalid`)
              }
              break
            case 'distance_unit':
              if (['mm', 'cm'].indexOf(shipment.parcel.distance_unit) === -1) {
                throw new ValidateShipmentShipmentException(`Value of parcel.distance_unit invalid`)
              }
              break
            default:
              if (this.defaultShipment.parcel.hasOwnProperty(key)) {
                if (shipment.parcel[key] === null || shipment.parcel[key] === '') throw new ValidateShipmentShipmentException(`Value of parcel.${key} can't empty`)
                if (!isNumeric(shipment.parcel[key])) throw new ValidateShipmentShipmentException(`Value of parcel.${key} invalid`)
              }
              break;
          }
        }
      }
    }
    return true
  }
}

export default new ValidateShipment()
