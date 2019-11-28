const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/model'))
app.listen(port, () => console.log(`Server listening on: ${port} port!`))
