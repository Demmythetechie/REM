import express from 'express';
import auth from './routes/authentication.js';
const app = express()
const port = 3000
app.use(express.json());


//Routes
app.use('/authentication', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
