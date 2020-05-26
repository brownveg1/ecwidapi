const express = require('express')
const product = require('./product')
const app= express()

const port= process.env.PORT || 3000


app.use(express.json())


app.post('/webhook',(req, res) =>{

 
product(req.body.queryResult.parameters.orderno, (error,data) => {
  if (error) {
      return res.send({ error })
  }
      res.send({
          
          fulfillmentMessages:[{"text":{"text":[data]}}]
          
       
      })
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})