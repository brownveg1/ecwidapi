const request = require('request')

const order = (orderno,callback) =>{
    const url ='https://app.ecwid.com/api/v3/16838918/orders?orderNumber='+orderno+'&token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X'
request({url: url, json:true},(error, {body}) => {

    if (body.errorMessage){

    callback('Please provide valid order number .',undefined,undefined)
    return
}

    else if(body.total===0){

        callback('Please Provide correct order number',undefined,undefined)
        return
    }

    else    {    
        
         
          callback(undefined, ' Order No. '+body.items[0].vendorOrderNumber
          +'  Total Amount  '+body.items[0].total 
          +'  Paymnet Method  '+body.items[0].paymentMethod
          +'  Paymnet Status  '+body.items[0].paymentStatus
          +'  Order Status  '+body.items[0].fulfillmentStatus , {
                  
        
            name:body.items[0].shippingPerson.name,
            Address: body.items[0].shippingPerson.street,
            phone: body.items[0].shippingPerson.phone,
            paymentStatus: body.items[0].paymentStatus,
            TotalAmount: body.items[0].total
           } )

                
    }
                        
        })

}
module.exports= order

