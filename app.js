"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

if(!fs.existsSync('/tmp/uploads')){
	fs.mkdirSync('/tmp/uploads');
}

if(!fs.existsSync('/tmp/uploads/reports')){
	fs.mkdirSync('/tmp/uploads/reports');
}

if(!fs.existsSync('/tmp/downloads')){
	fs.mkdirSync('/tmp/downloads');
}


// app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//CORS Enabling
app.use(cors());
app.options('*', cors());

app.use('/static', express.static(__dirname + '/public'));

// Morgan
app.use(morgan('combined', { stream: Logger.stream }));


app.use((req, res, next) => {
	myRequest.run(function () {
		myRequest.set('reqId', uuid.v1());
		next();
	});
});

const requestLogger = (req, res, next) => {
	if (req.headers && Object.keys(req.headers).length > 0) {
		logger.info('REQUEST HEADERS');
		logger.info(req.headers);
	}

	if (req.query && Object.keys(req.query).length > 0) {
		logger.info('REQUEST QUERY PARAMETERS');
		logger.info(req.query);
	}

	if (req.params && Object.keys(req.params).length > 0) {
		logger.info('REQUEST PARAMS');
		logger.info(req.params);
	}

	if (req.body && Object.keys(req.body).length > 0) {
		logger.info('REQUEST BODY PARAMETERS');
		logger.info(req.body);
	}

	return next();
};

app.use(requestLogger);



process.on("unhandledRejection", function(reason, promise){
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
  console.log("unhandledRejection", reason, promise);
});

// Cron Job to auto assign cases to inspectors.
// assignCaseCronJob.assignCaseCronJob().start();


// Cron Job to auto decline cases which are not accepted by the user in 5 mins
// autoDeclineInspectionCronJob.autoDeclineCaseCronJob().start();
autoDeclineInspectionCronJob.startDeclineInspectionCron();

app.get('/docs', function (req, res) {
	return res.sendFile(__dirname + "/public/index.html");
});


//Top-Level Router Logic
let userRoute = require('./routes/user');
let caseRoute = require('./routes/case');
let roleRoute = require('./routes/role');
let companyRoute = require('./routes/company');
let vehicleRoute = require('./routes/vehicle');
let paymentRoute = require('./routes/payment');
let permissionRoute = require('./routes/permission');
let requesterRoute = require('./routes/requester');
let surveyRoute = require('./routes/survey');
let networkCityRoute = require('./routes/networkCity');
let locationRoute = require('./routes/location');
let inspectorRoute = require('./routes/inspector');
let statusRoute = require('./routes/status');
let utilsRoute = require('./routes/utils');

// app.use('/', (req, res, next) => {
//   logger.logRequest(req);
//   next();
// });

app.get('/', function(req, res){
  res.status(200).json({
    success: true,
    message: 'VIA API - Health Check'
  });
});



app.use('/api/v1.0/users', userRoute);
app.use('/api/v1.0/cases', caseRoute);
app.use('/api/v1.0/roles', roleRoute);
app.use('/api/v1.0/companies', companyRoute);
app.use('/api/v1.0/vehicles', vehicleRoute);
app.use('/api/v1.0/payments', paymentRoute);
app.use('/api/v1.0/permissions', permissionRoute);
app.use('/api/v1.0/requesters', requesterRoute);
app.use('/api/v1.0/surveys', surveyRoute);
app.use('/api/v1.0/cities', networkCityRoute);
app.use('/api/v1.0/locations', locationRoute);
app.use('/api/v1.0/inspectors', inspectorRoute);
app.use('/api/v1.0/statuses', statusRoute);
app.use('/api/v1.0/utils', utilsRoute);


app.use(function(err, req, res, next){
  debug('-------ERROR------');
  debug(err);
  debug(err.statusCode, typeof err.statusCode);
  debug(err.message);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode === 500 ? 'Something went wrong' : err.message,
  });
});

//Module
module.exports = app;