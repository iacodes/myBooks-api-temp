const http = require("http")
const fs = require("fs")
const url = require("url")
const queryString = require("querystring")
const figlet = require('figlet')
const PORT = 8000

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = queryString.parse(url.parse(req.url).query)
  console.log(page)

  if (page == "/"){
    fs.readFile("index.html", function(err, data){
      res.writeHead(200, {"Content-type": "text/html"});
      res.write(data)
      res.end()
    })
  }

  // else if (page == "/index.html"){
  //   fs.readFile("index.html", function(err, data){
  //     res.writeHead(200, {"Content-type": "text/html"});
  //     res.write(data)
  //     res.end()
  //   })
  // }

  else if (page == "/mybooks.html"){
    fs.readFile("mybooks.html", function(err, data){
      res.writeHead(200, {"Content-type": "text/html"});
      res.write(data)
      res.end()
    })
  }

  else if (page == "/js/main.js"){
    fs.readFile("js/main.js", function(err, data){
      res.writeHead(200, {"Content-type": "text/javascript"});
      res.write(data)
      res.end()
    })
  }

  else if (page == "/css/style.css"){
    fs.readFile("css/style.css", function(err, data){
      res.write(data)
      res.end()
    })
  }
  else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
} )


server.listen(process.env.PORT ||PORT)
// using process.env.PORT for pushing to heroku so if heroko has port, it will use that. Otherwise use PORT
