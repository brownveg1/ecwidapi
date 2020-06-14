const request = require("request");
const csvParse = require("csv-parse");
const {google} = require('googleapis')
const { OAuth2Client } = require('google-auth-library')
const keys =require('./client_secret.json')


const readquiry =(searchId,items)=>{
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
)
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
  
  function gsrun(cl){const gsapi=google.sheets({version:'v4',auth:cl})
      const spreadsheetId = "1rRS3jugb-txthDdZ0x0nGSzyLna64mBmKnUVkditeTM"  // Please set the Spreadsheet ID.
    const sheetId = "0"  // Please set the sheet ID.
        
    cl.getRequestHeaders().then((authorization) => {
      const query = `select * where A='${searchId}'`
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${sheetId}&tq=${encodeURI(query)}`
      let options = {
        url: url,
        method: "GET",
        headers: authorization,
      };
      request(options, (err, res, result) => {
        if (err) {
          console.log(err)
          return;
        }
        csvParse(result, {}, (err, ar) => {
           var array=[]
           var total=[]
           ar.forEach(a => { 
          var temp  =( {"price":parseInt(a[3]),"weight":parseInt(a[4]),"sku":a[1],"quantity":1,"name":a[2]}
                         )
                       var  x=parseInt(a[7])
                        
                       total.push(x);
                       
                        array.push(temp);
                     } )

                      
                      var sum = total.reduce(function(a, b){
                        return a + b;
                    }, 0)
            
                     
         items(array,sum)
          }
         
        )
      
      })
    })
    
    
  }
  
}
module.exports=readquiry