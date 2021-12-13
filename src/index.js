import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { routes } from './routes/api.js'
import { connectToDb } from './db/db.js';

// init app
const app = express()

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

connectToDb().then(() => {
  console.log("connected to db");
}).catch(err => { throw err })

app.use(function (err, req, res, next) {
  res.status(422).send({error: err.message})
})

app.listen(process.env.port || 8000, () => {
  console.log('server started at http://localhost:8000');
});
