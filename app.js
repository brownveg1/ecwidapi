const express = require('express')
const product = require('./scr/product')
const order = require('./scr/findorder')
const cancleorder = require('./scr/cancleorder')
const value = require('./scr/sheet')
const {google} = require('googleapis')
const { OAuth2Client } = require('google-auth-library')
const keys =require('./scr/client_secret.json')

const app= express()

const port= process.env.PORT || 3000

app.use(express.json())

app.post('/webhook',(req, res) =>{
    const { productid,orderno,name,contactnum ,complaint,complaint2 ,compalint3,cancleorde,} =req.body.queryResult.parameters 
    let now = new Date()
   

    if(productid){
   
     product(productid, (error,data) => {
      res.json({
          
          "fulfillmentText":data
                
             })
     })
    }

    else if (complaint){
        
         order(complaint2, (error,data,data1) => {

            if (error){
             return res.json({ "fulfillmentText":'Please provide your contact number our customer support team will get back to you soon .'  })
                     }              
         else{

            const values = {values:  [ [complaint, compalint3,complaint2,data1.name,data1.Address,data1.phone,now], ],}
            const key = '1u0SLOjR6c5ILSdY2M8X06Dp7KHhj8bPXF3GgzSH7Yyw'
                value(key,values)
                    res.json( { "fulfillmentText": 'Dear '+data1.name+ ' your complain has been registered , we will get back to you soon'} )
                }               
            } )
         }

    else if(name){
        const values1 = {values:  [ [name,contactnum,now], ],}
        const key = '1GoQ252VHJmVYs67yoq7vKs9XXrlRIhVvrGNngunTYiE'
             value(key,values1)
             res.json({  "fulfillmentText":"Dear "+name +" your query submitted  succesfully , We will get back to you soon " })
         }

    else if (orderno){
        order(orderno, (error,data) => {
            res.json({ "fulfillmentText": data  }  )
            })
         } 
         
    else if(cancleorde){
        order(cancleorde, (error,data,data1) => {
            const num1= data1.phone.substring(data1.phone.length  -10, data1.phone.length )
            const num2 =contactnum.substring(contactnum.length -10 ,contactnum.length )
            if (num1!=num2){
             return res.json({ "fulfillmentText":'Please provide your contact number associated with order .'  })
                     }              
         else{
           cancleorder(cancleorde)
                if(data1.paymentStatus==='PAID') {
                    res.json( { "fulfillmentText": 'Dear '+data1.name+ ' your order is already cancelled .'} )
                }
                else{
                    const values = {values:  [ [cancleorde,data1.name,data1.phone,data1.TotalAmount,now], ],}
                    const key = '1xPLDR3uAMVd50-yqU1B14Hq8gx8PxUocQJbXu4Fnclw'
                    value(key,values)
                    res.json( { "fulfillmentText": 'Dear '+data1.name+ ' your order has been cancelled . Rs.'+ data1.TotalAmount +' will be refunded to your account , We hope to see you soon '} )
                }           
                      
                }        
                       
            } )
        

    }
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})