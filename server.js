require('dotenv').config()
// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//stripe
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51K6PZKAPJKSXew76K3l4ifK78SkwZVoQilqvDZBapaR2r9DAD13RJoN3F4NIZdGD2HHobjE57APZAi6dEVxh9vDZ00isnRXpTm');

// seed data
require('./app/data/seedTags')

// require route files
const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')
const tagRoutes = require('./app/routes/tag_routes')
const pieceRoutes = require('./app/routes/piece_routes')
const profileRoutes = require('./app/routes/profile_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
	useNewUrlParser: true,
})

mongoose.connection.once('open', ()=> {
	console.log(`Connected to Mongo at ${mongoose.connection.host}:${mongoose.connection.port}`)
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
// app.use(
// 	cors()
// )
console.log('CORS ENV:', process.env.CLIENT_ORIGIN);
console.log('Running Node.js version:', process.version);

app.use(cors({
  origin: 'https://mgkdn9.github.io', // Allow GitHub Pages frontend
  credentials: true, // Optional: if you use cookies/auth
}));
app.options('*', cors({
  origin: 'https://mgkdn9.github.io',
  credentials: true,
}));


// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

//middleware for stripe
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use(exampleRoutes)
app.use(userRoutes)
app.use(tagRoutes)
app.use(pieceRoutes)
app.use(profileRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

//stripe test routes
// confirm the paymentIntent
app.post('/pay', async (request, response) => {
	try {
	  // Create the PaymentIntent
	  let intent = await stripe.paymentIntents.create({
		payment_method: request.body.payment_method_id,
		description: "Test payment",
		amount: request.body.amount,
		currency: 'usd',
		confirmation_method: 'manual',
		confirm: true
	  })
	  console.log(intent);
	  // Send the response to the client
	  response.send(generateResponse(intent));
	} catch (e) {
	  // Display error on client
	  return response.send({ error: e.message });
	}
  });
  
  const generateResponse = (intent) => {
	if (intent.status === 'succeeded') {
	  // The payment didn’t need any additional actions and completed!
	  // Handle post-payment fulfillment
	  return {
		success: true
	  };
	} else {
	  // Invalid status
	  return {
		error: 'Invalid PaymentIntent status'
	  };
	}
  };

// stripe request handlers
app.get('/', (req, res) => {
	res.send('Stripe Integration Server');
});

// run API on designated port (4741 in this case)
app.listen(port, () => {
	console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
