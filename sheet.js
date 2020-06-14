const {google} = require('googleapis')
const { OAuth2Client } = require('google-auth-library')
const keys =require('./client_secret.json')
let now = new Date()

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)
const value = (key,values1) =>{

    client.authorize(function(error,tokens,value){
    
        if (error){
            console.log(error)
            return
        }
    
        else {
            console.log('conectted')
            gsrun(client)

            }
    
    }) 
    
    async function gsrun(cl){const gsapi=google.sheets({version:'v4',auth:cl}) 
const appendOption ={
    spreadsheetId: key,
     range: 'Sheet1!A2',
     valueInputOption: 'USER_ENTERED', 
     resource: values1
    }
  
    let res = await gsapi.spreadsheets.values.append(appendOption)

    
    console.log('your complain registered  succesfully ')
  }
}


 module.exports=value

