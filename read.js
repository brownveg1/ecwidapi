const {google} = require('googleapis')
const { OAuth2Client } = require('google-auth-library')
const keys =require('./client_secret.json')


const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

    client.authorize(function(error,tokens){
    
        if (error){
            console.log(error)
            return
        }
    
        else {
            console.log('conectted')
            gsrun(client)

            }
    
    }) 
    
    async function gsrun(cl){
        
        const gsapi=google.sheets({version:'v4',auth:cl}) 
        let data = await gsapi.spreadsheets.values.get({ 
       spreadsheetId: '1rRS3jugb-txthDdZ0x0nGSzyLna64mBmKnUVkditeTM',
        range: 'Sheet1!a1:g100'
       

        })       
          
    console.log(data.data.values)
  }

