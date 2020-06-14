const request = require('request')

const creatorder=(total,email,date,items,fname,callback)=>{


const options = {
  'method': 'POST',
  'url': 'https://app.ecwid.com/api/v3/16838918/orders?token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"subtotal":total,"total":total,"email":email,"paymentMethod":"Pay on delivery","tax":0,"paymentStatus":"AWAITING_PAYMENT","customerTaxExempt":false,"customerTaxId":"","customerTaxIdValid":false,"reversedTaxApplied":false,"fulfillmentStatus":"AWAITING_PROCESSING","createDate":date,"items":items,"billingPerson":fname,"shippingPerson":fname,"shippingOption":{"shippingMethodName":"Fast Delivery","shippingRate":0},"hidden":false,"privateAdminNotes":"","acceptMarketing":true,"disableAllCustomerNotifications":false,"externalFulfillment":true,"externalOrderId":"2"})
  
  }
request(options, function (error, response) {
  if (error) throw new Error(error)
  callback(undefined,response.body)
})

}
module.exports=creatorder