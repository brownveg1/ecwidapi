const express = require('express')
const product = require('./product')
const order = require('./findorder')

const app= express()

const port= process.env.PORT || 3000


app.use(express.json())


app.post('/webhook',(req, res) =>{
    const productid =req.body.queryResult.parameters.productid
    const   orderno =req.body.queryResult.parameters.orderno
    if(req.body.queryResult.parameters.productid){

     product(productid, (error,data) => {
      res.json({
          
          fulfillmentMessages:[{"text":{"text":[data]}}]
                
             })
     })
    }


    else{
        order(orderno, (error,data) => {
            res.json({
                
                fulfillmentMessages:[{"text":{"text":[data]}}]
                      
                   })
           })
         }

    
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})