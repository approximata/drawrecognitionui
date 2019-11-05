const express = require('express')
const app = express()
const port = 3000

app.use(express.static('model'))
app.listen(port, () => console.log(`Model folder is avaiable at port: ${port}!`))