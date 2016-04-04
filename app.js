var express = require('express'),
  app = express(),
  watson = require('watson-developer-cloud'),
  bodyParser  = require('body-parser');

app.set('view engine', 'ejs');  

// Configure Express
  app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
  app.use(bodyParser.json({ limit: '15mb' }));

var personalityInsights = watson.personality_insights({
  "password": "<password>",
     "url": "https://gateway.watsonplatform.net/personality-insights/api",
     "username": "<username>",
  version: 'v2',
  headers: {
    'X-Watson-Learning-Opt-Out': 1
  }
});

app.get('/test', function(req,  res) {

    var my_profile = "Call me Ishmael. Some years ago-never mind how long precisely-having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off-then, I account it high time to get to sea as soon as I can.";
    personalityInsights.profile({ text: my_profile },
    function (err, profile) {
      if (err)
        res.json(err)
      else
        res.json(profile);
    });



});

app.get('/', function(req, res) {

	res.render('index');

});

app.post('/calculateInsight', function(req, res) {

	console.log(req.body.content);

	if(req.body.content.length < 20000) {
		res.send('Please enter more than 3000 words approx');
	}else 
	{
		var profile = req.body.content;
		personalityInsights.profile({ text: profile },
	    function (err, profile) {
	      if (err)
	        res.json(err)
	      else
	        res.render('insight', {insightData: profile});
	    });
	}
	
	/**
	
    **/

});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);