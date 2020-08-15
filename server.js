const express = require('express');
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
const API_KEY = 'kAIGRVo24X_xzTzpe_60tBHWNvlidV6DjXfHQ9-XID4EvHGzRdb072Dk_zTkGbbGAuEOctvi2VsK3pLT3P488YkxIKZrXWvUiHN-m2cwEwKc7Vstnh1JgB9OTL8MX3Yx'

const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
  res.json('root. nothing to see here.')
})

app.post('/search', (req,res) => {
  console.log('searching')
  
  const {term, categories, location, radius, open_now, attributes, price, limit} = req.body

  fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&categories=${categories}&location=${location}&radius=${radius}&open_now=${open_now}&attributes=${attributes}&price=${price}&limit=${limit}`, {
      method: 'GET',
      headers: {Authorization : 'Bearer ' + API_KEY},
    })
    .then(promise => promise.json())
    .then(result => {
      // console.log(result)
      res.send(result)
    })
    .catch((err) => {
      // console.log(err)
      res.status(500).send('oops')
    })
})

app.listen(PORT, () => console.log('listening...'))