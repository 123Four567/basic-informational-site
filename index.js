const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

const dir = fs.readdirSync("./", {withFileTypes: true})

const htmlFiles = dir
.filter( file => {
  if ((file.name).endsWith(".html")){
    return file.name
  }
})
.map( file => {
  return "/" + file.name
})

const server = http.createServer((req, res) => {
  const url = req.url

  if (htmlFiles.includes(url)){
    const file = fs.readFileSync("." + url)
    res.end(file)
  } else if (url == "/"){
    const file = fs.readFileSync("./index.html")
    res.end(file)
  } else {
    const file = fs.readFileSync("./404.html")
    res.end(file)
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});