var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

request('http://substack.net/images/', function(error, response, body){
  var htmlArray = body.split("</tr>");
  var bigCsvString ="";

  for (var i = 0; i < htmlArray.length; i++){
    var tempArray = []

    $ = cheerio.load(htmlArray[i]);
    var permission = $('code').first().text();
    var url = $('a').attr('href');
    var imgType = url.split(".")[1];

    tempArray.push(permission, "http://substack.net" + url, imgType);
    bigCsvString += tempArray.join(',') + "\n";
  }
    // console.log(bigCsvString);
    fs.writeFile("data.csv", bigCsvString, 'utf8', function(err){
      if(err) throw err;
    })
});



