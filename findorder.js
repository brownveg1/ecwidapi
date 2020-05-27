const request = require('request')

const order = (orderno,callback) =>{
    const url ='https://app.ecwid.com/api/v3/16838918/orders?orderNumber='+orderno+'&token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X'
request({url: url, json:true},(error, response) => {

    if(response.body.total==0){
        callback(undefined,'Please provide valid order no.')

    }


    else if(response.body.errorMessage){

        callback(undefined,'Please provide valid order no.')
    }

    else    {    
        
         
          callback(undefined, ' Order No. '+response.body.items[0].vendorOrderNumber
          +'  Total Amount  '+response.body.items[0].total 
          +'  Paymnet Method  '+response.body.items[0].paymentMethod
          +'  Paymnet Status  '+response.body.items[0].paymentStatus
          +'  Order Status  '+response.body.items[0].fulfillmentStatus)          
            
            }  
        })

}
module.exports=order