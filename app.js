/*eslint-env node*/

//------------------------------------------------------------------------------
// Breast Cancer Prediction app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require ('body-parser');
var request = require('request');
var requestPromise = require('request-promise');

// Deprecated Username and password to invoke the Watson ML Service
//var username = '5199f337-af08-4d3b-b6f1-2484781c88b6';
//var password = 'f49c73dc-0550-4507-a2f0-a63f563d7904';

// Breast Cancer Prediction ML Deployment Endpoint
var endpointURL = 'https://us-south.ml.cloud.ibm.com/v3/wml_instances/fa2eedfb-97ee-432b-abe5-49c2c8a109c0/deployments/0a31a2b3-d5d2-4ae2-a9cd-5a24efedd93d/online';



//======== Watson ML Header
var btoa    = require( "btoa" );
var request = require( 'request' );

// Paste your Watson Machine Learning service apikey here
var apikey = "rnNXU30n1ajQEh4pSmb-gAJudCuWyv-albrPp3q9GkLy";

// Use this code as written to get an access token from IBM Cloud REST API
//
var IBM_Cloud_IAM_uid = "5199f337-af08-4d3b-b6f1-2484781c88b6";
var IBM_Cloud_IAM_pwd = "f49c73dc-0550-4507-a2f0-a63f563d7904";

var options = { url     : "https://iam.bluemix.net/oidc/token",
                headers : { "Content-Type"  : "application/x-www-form-urlencoded",
                            "Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
                body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" };

request.post( options, function( error, response, body )
{
    var iam_token = JSON.parse( body )["access_token"];
} );

//========

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Main page
app.get('/',function(req, res) {
  	res.render('pages/index');
});

// About page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// WatsonMLResponse page - Shows the prediction results based on the predicter parameter inputs
app.get('/WatsonMLResponse', function(req, res) {
	//var WMLFinalResponse = ''+app.get('WatsonMLResponse');
    res.render('pages/predictionResponse', {'WMLFinalResponse':app.get('WatsonMLResponse')});
});

app.post('/submit-watsonml-data', function (req, res) {


	//Set the response in the app so that the redirect can use it to render
	//app.set('WatsonMLResponse',JSON.stringify(body2));
	app.set('WatsonMLResponse',iam_token);
	res.redirect("/WatsonMLResponse");
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
