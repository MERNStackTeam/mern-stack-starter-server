const bodyParser   = require('body-parser');
const cors         = require('cors');
const express      = require('express');

require('./environment');
require('./src/database');

const configPassport  = require('./auth/passport');
const routes          = require('./src/routes');

const port         = process.env.PORT;
const origin       = process.env.ORIGIN;
const app          = express();

app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin,
}));

configPassport(app, express);

app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
