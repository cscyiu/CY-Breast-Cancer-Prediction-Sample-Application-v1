# Sample Node JS Application for the Breast Cancer Prediction Machine Learning Model Deployed on Watson ML

In order for an application to invoke the Watson ML Service, it first needs to authenticate.  As of May 2019, the old method of authenticating through the use of WML tokens is deprecated.

Therefore, one must authenticate now using IAM

For details, please see:
https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html

Specifically for Node JS, the sample code snippet is as below:

===================

var btoa    = require( "btoa" );
var request = require( 'request' );

// Paste your Watson Machine Learning service apikey here
var apikey = "123456789";

// Use this code as written to get an access token from IBM Cloud REST API
//
var IBM_Cloud_IAM_uid = "bx";
var IBM_Cloud_IAM_pwd = "bx";

var options = { url     : "https://iam.bluemix.net/oidc/token",
                headers : { "Content-Type"  : "application/x-www-form-urlencoded",
                            "Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
                body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" };

request.post( options, function( error, response, body )
{
    var iam_token = JSON.parse( body )["access_token"];
} );

===================
