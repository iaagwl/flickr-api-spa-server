let http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path')

let server = http.createServer((req, res) => {
  console.log('request was made: ' + req.url)
  if (req.url === '/' || req.url === '/home' || req.url === '/gallery' ||
      req.url === '/popular' || req.url === '/recent' || req.url === '/search'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  } else {
    let uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), uri)

    fs.exists(filename, (exists) => {
      if(!exists) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
        return
      }
      fs.readFile(filename, 'binary', (err, file) => {
        if(err) {
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.write(err)
          res.end()
          return
        }
        res.writeHead(200)
        res.write(file, 'binary')
        res.end()
      })
    })
  }
})

server.listen(process.env.PORT || 3000)
console.log('listening to port 3000')
