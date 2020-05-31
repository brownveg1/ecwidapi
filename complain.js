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
     resource:{values:  [
        ["Door", "$15", "2", "3/15/2016"],
        ["Engine", "$100", "1", "3/20/2016"],
      ],}    
    }
  
    let res = await gsapi.spreadsheets.values.append(appendOption)
    console.log('your complain registered  succesfully ')
  }