import {compareArray, isNumeric} from '../Helpers'
function ValidateParcelException (message) {
  this.message = message
  this.name = "Validate parcel exception"
}

class ValidateParcel {
  constructor () {
    this.defaultParcel = {
      "cod": null,
      "length": null,
      "width": null,
      "height": null,
      "weight": null,
      "mass_unit": null,
      "distance_unit": null
    }
  }
  valid (parcel) {
    let checkParcel = compareArray(Object.keys(this.defaultParcel), Object.keys(parcel))
    if (!checkParcel.status) {
        throw new ValidateParcelException(`Missing ${checkParcel.value}`)
      } else {
        for (const key of Object.keys(parcel)) {
          switch (key) {
            case 'mass_unit':
              if (['g', 'kg'].indexOf(parcel.mass_unit) === -1) {
                throw new ValidateParcelException(`Value of mass_unit invalid`)
              }
              break
            case 'distance_unit':
              if (['mm', 'cm'].indexOf(parcel.distance_unit) === -1) {
                throw new ValidateParcelException(`Value of distance_unit invalid`)
              }
              break
            default:
              if (this.defaultParcel.hasOwnProperty(key)) {
                if (parcel[key] === null || parcel[key] === '') throw new ValidateParcelException(`Value of ${key} can't empty`)
                if (!isNumeric(parcel[key])) throw new ValidateParcelException(`Value of ${key} invalid`)
              }
              break;
          }
        }

      }
  }
}
export default new ValidateParcel()
