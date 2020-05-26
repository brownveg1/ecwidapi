const request = require('request')

const product = (sku,callback) =>{
    const url ='https://app.ecwid.com/api/v3/16838918/products?sku='+sku+'&token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X'
request({url: url, json:true},(error, response) => {
    if(response.body.total==0){
        callback('Product is not available. ',undefined)
            
        }  

        else if(response.body.errorMessage){

            callback('Products is not available try another products',undefined)
        
        }
        else{
            callback(undefined,  response.body.items[0].name + ' Rs.'+ response.body.items[0].price +'/Kg')          
                
                 
               
                
            
            }
       

        
    })

}
 module.exports= product