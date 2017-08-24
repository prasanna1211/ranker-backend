import http from 'http';
import fs from 'fs';
function getHtmlData(request,response){
  var options = {
    host: 'www.google.co.in',
    path: '/search?ie=ISO-8859-1&q=react+js+development+company&btnG=Search',
    method: 'GET',
    headers:{
      'User-Agent':'Nokia5310XpressMusic/1.0 Profile/MIDP-2.1'
    }
  };

  http.request(options, function(res) {
    fs.unlink('targetLinks.html', function(err) {
       if (err) {
          return console.error(err);
       }
       console.log("File deleted successfully!");
    });
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      fs.appendFile('targetLinks.html',chunk , function(err){
        if(err){
          return console.log(err);
        }
      })
    });
    response.json({
      message:'links written to html'
    })
  }).end();
}

export default getHtmlData;
