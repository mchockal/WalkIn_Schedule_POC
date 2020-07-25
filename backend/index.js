import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './routes/appRoutes.js';
import Arena from 'bull-arena';

const app = express();
const PORT = process.env.PORT || 3000; 
global.qMap = new Map();
global.qArena = []; 

//mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://host.docker.internal:27017/RemedyPOCDB', {
    useNewUrlParser : true,
     useUnifiedTopology : true
});

//bodyparser setup
app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());

//cors setup
app.use(cors());

routes(app);


app.get('/', (request, response) => 
    response.send(`Walk in Schedule POC code running on port ${PORT}`)
);

app.use('/', Arena(
    {
      queues: global.qArena
    },
    {
      basePath: '/arena',
      disableListen: true
    }
  ));

app.listen(PORT, () =>
    console.log(`Server : Walk In Schedule POC App running on port ${PORT}`)
);