const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('model'))
app.listen(port, () => console.log(`Model folder is avaiable at port: ${port}!`))