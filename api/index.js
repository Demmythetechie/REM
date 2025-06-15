const express = require('express');
import auth from './Routes/authentication';
const app = express()
const port = 3000


//Routes
app.use('/authentication', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
