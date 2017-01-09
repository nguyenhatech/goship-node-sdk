import http from 'http'
import Goship from '../src/Goship'

var log = (d) => {
  console.log(d)
}
let GS = new Goship({
  client_id: 4,
  client_secret: '1QgVKugceEbyifhvi0Bdo7CRELXTJgVfwmxJrkTb',
  username: 'nguyentranhoan13@gmail.com',
  password: '123456',
  workspace: 'dev'
  // access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiYWViNTVhZGNlMzY3MGI4YjYzNWNhY2I4MTU1NmEyZjM5ODgzOWRiOTdjM2FmNWZkNWYxZjc2YTc2YzVkZDg5ZDQ4NzE3ZWMwODY2MGQ2In0.eyJhdWQiOiIxIiwianRpIjoiMGJhZWI1NWFkY2UzNjcwYjhiNjM1Y2FjYjgxNTU2YTJmMzk4ODM5ZGI5N2MzYWY1ZmQ1ZjFmNzZhNzZjNWRkODlkNDg3MTdlYzA4NjYwZDYiLCJpYXQiOjE0ODM1MjYzMjMsIm5iZiI6MTQ4MzUyNjMyMywiZXhwIjoxNTE1MDYyMzIzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.Wa2KRnJ2TqPeFim-0_XSHmOO3-9xD4CBF4HGbDE3bo1ppgdqHYBYJEzJGo3bdHv_I-4JjFGphEGx8KgxghJrAkN7DBa9wwnQ5J9PVvlr8_hLcjLiE2esmReN2STQzBHq6ikjx6PyY6QG5ZdrqeNj8GH-m5z-DGjm0TzB-O1KMpJu65mS7ZHY67xzYako3q3uAjs1VP54g6b_iJD_G7zljhuhW33vU7LtSO03TsNobODxL22qD3PhbGWQFMT3fq9ewA7neIusfE82zC-P1j90XXQ5GAkiT-kbluAiFW6PQWK0mpXtsHOeN3tvkdVrUX_Vjt4YFq0K3J-VKoQMsd6InMn9vP9hAVmkEyXv1mar6HQoKn_K9-uFL6dLWOHWMsWn42y7FtSYpmbVDNKFyqggWSe3FBZX2UmyKS1VCTqI6qq8-gI7o2g2RIXoGhMHBjQZp-fsntj3HX0-PizaWBwRJIVBulP-hd9NsZlrgmHlOCew4DYRzi6Yfz981x4JaCx34vFS6igHV2F4Cg1pbys0r94IWFO9m2uMahVBdvkpBYjrPbkip5y8BZZPfijjgXgr37iB9sLYKrVFQWoL7zunRTA3NPOyF_zGDnylOw9fC-g78YULC73CQDmZFFRsI_Um3VTrf9QTwbyZDHk96h5AY-edoQnZwXiJpcEHZBBA9xc'
})
GS.getRates({
  "address_from": {
    "name": "Alvin Tran",
    "phone": "0913292679",
    "street": "15/03 Ngọc Hồi",
    "city": 100000,
    "district": 100300
  },
  "address_to": {
    "name": "Lai Dao",
    "phone": "0934577886",
    "street": "102 Thái Thịnh",
    "city": 880000,
    "district": 800300
  },
  "parcel": {
    "cod": "200000",
    "length": "10",
    "width": "10",
    "height": "10",
    "weight": "400",
    "mass_unit": "g",
    "distance_unit": "cm"
  }
}).then(response => {
  log(response)
})
GS.createShipment({
  "rate": "Nl8yXzE1OQ==",
    "address_from": {
      "name": "Alvin Tran",
      "phone": "0913292679",
      "street": "15/03 Ngọc Hồi",
      "district": 100900,
      "city": 100000
    },
    "address_to": {
      "name": "Lai Dao",
      "phone": "0934577886",
      "street": "102 Thái Thịnh",
      "district": 100200,
      "city": 100000
    },
    "parcel": {
      "cod": 50000,
      "weight": "220",
      "mass_unit": "g",
      "width": "15",
      "height": "15",
      "length": "15",
      "distance_unit": "cm",
      "metadata": "Hàng rất xịn, cấm sờ."
    }
}).then(response => {
  log(response)
})
GS.createShipmentWithRate({ id: 'N18yXzg4Mg==',
       carrier_name: 'Giao Hàng Nhanh',
       carrier_logo: 'http://goship.dev/storage/images/carriers/ghn_c.png',
       service: 'Giao nhanh 3 ngày',
       cod_fee: 0,
       weight_fee: 0,
       base_fee: 50000,
       step_fee: 20000,
       remote_area_fee: 0,
       insurance_fee: 0,
       oil_fee: 0,
       vat_fee: 7000,
       return_fee: 28000,
       delivery_fee: 70000,
       total_fee: 77000 }).then(response => {
        log(response)
       })
// GS.getToken().then(response => {
//   log(response)
// })
// GS.trackShipment('GOO196QQ16J').then(response => {
//   log(response)
// })
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello Goship\n')
}).listen(1337, '127.0.0.1')

console.log('Server running at http://127.0.0.1:1337/')
