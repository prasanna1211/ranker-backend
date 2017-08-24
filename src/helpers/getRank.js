import fs from 'fs';
import cheerio from 'cheerio'
function getRank(request,response){
  var link=request.body.link;
  var $=cheerio.load(fs.readFileSync('targetLinks.html'));
  console.log($('#universal').find('a').length);
  if($('#universal').find(link)){
    response.json({
      message:true
    })
  }else{
    response.json({
      message:false
    })
  }
}
export default getRank;
