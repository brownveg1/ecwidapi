const express = require('express')
const product = require('./product')
const order = require('./findorder')
const {google} = require('googleapis')
const { OAuth2Client } = require('google-auth-library')
const keys =require('./client_secret.json')





const app= express()

const port= process.env.PORT || 3000


app.use(express.json())


app.post('/webhook',(req, res) =>{
    const productid =req.body.queryResult.parameters.productid
    const   orderno =req.body.queryResult.parameters.orderno
    const  name =req.body.queryResult.parameters.name
    const contactnum =req.body.queryResult.parameters.contactnum
    const complaint =req.body.queryResult.parameters.complaint
    const complaint2 =req.body.queryResult.parameters.complaint2
    const compalint3 =req.body.queryResult.parameters.compalint3
    let now = new Date()

    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    )
    

    if(req.body.queryResult.parameters.productid){
   
     product(productid, (error,data) => {
      res.json({
          
          "fulfillmentText":data
                
             })
     })
    }

    else if (req.body.queryResult.parameters.complaint){
        
        order(complaint2, (error,data,data1) => {
            if (error){
               return res.json({
          
                    "fulfillmentText":'Please provide your number our customer support team will get back to you soon .'
                          
                       })
            }
            else{

    const values = {values:  [ [complaint, compalint3,complaint2,data1.name,data1.Address,data1.phone,now], ],}
    
client.authorize(function(error,tokens){

    if (error){
        Console.log(error)
        return
    }

    else {
        console.log('conectted')
        gsrun(client)
    }

}) 

async function gsrun(cl){

    const gsapi=google.sheets({version:'v4',auth:cl})
    const appendOption ={
    spreadsheetId: '1u0SLOjR6c5ILSdY2M8X06Dp7KHhj8bPXF3GgzSH7Yyw',
     range: 'Sheet1!A2',
     valueInputOption: 'USER_ENTERED', 
     resource: values
    }
  
    let res = await gsapi.spreadsheets.values.append(appendOption)

    
    console.log('your complain registered  succesfully ')
  }
}

          res.json(

                {
                    "fulfillmentText": data
                 }
                  
            )
    
                      
    }   )
                        
             
    }

    else if(req.body.queryResult.parameters.name){
        const values1 = {values:  [ [name,contactnum,now], ],}
    
        client.authorize(function(error,tokens){
        
            if (error){
                Console.log(error)
                return
            }
        
            else {
                console.log('conectted')
                gsrun(client)
            }
        
        }) 
        
        async function gsrun(cl){
        
            const gsapi=google.sheets({version:'v4',auth:cl})
            const appendOption ={
            spreadsheetId: '1GoQ252VHJmVYs67yoq7vKs9XXrlRIhVvrGNngunTYiE',
             range: 'Sheet1!A2',
             valueInputOption: 'USER_ENTERED', 
             resource: values1
            }
          
            let res = await gsapi.spreadsheets.values.append(appendOption)
        
            
            console.log('your request submited succesfully ')
          }
        
        
          res.json({
                        
            "fulfillmentText":"Dear customer  your query subited succesfully , We will get back to you soon "
                  
               })
            
    }

    else if (req.body.queryResult.parameters.orderno){
        order(orderno, (error,data) => {
            res.json(

                {
                    "fulfillmentText": data
                 }
                  
            )
           })
         }

    
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})