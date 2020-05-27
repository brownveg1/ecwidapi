const request = require('request')

const product = (sku,callback) =>{
    const url ='https://app.ecwid.com/api/v3/16838918/products?sku='+sku+'&enabled=true&token=secret_1pudxM5Phxy1WwhJWX2cqPRvXV68sc3X'


request({url: url, json:true},(error, response) => {
        
    if(response.body.total==0){
        callback(undefined,'Please provide valid product.')

    } 
    
    
    else if(response.body.items[0].enabled==false){

        callback(undefined,'product is not available   right now ')
    }

    else    {    
        
        callback(undefined,  response.body.items[0].name + ' Rs.'+ response.body.items[0].price )          
    
    }

})

}

module.exports=product