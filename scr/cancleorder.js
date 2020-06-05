const  request = require('request')


const cancleorder = (orderno) =>{
var options = {
  'method': 'PUT',
  'url': 'https://app.ecwid.com/api/v3/16838918/orders/'+orderno+'?&token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: "{\r\n         \"paymentStatus\": \"CANCELLED\",\r\n        \"fulfillmentStatus\": \"WILL_NOT_DELIVER\",\r\n}"

};
request(options, function (error, response) { 
  if (error) throw new Error(error)
    
})

}
module.exports=cancleorder