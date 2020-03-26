const http = require('http')

let router = [{
    path: '*',
    method: '*',
    handle: function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404')
    }
}]

module.exports = {
    get: function (path, fn) {
        router.push({
            path: path,
            method: 'GET',
            handle: fn
        })
    },
    listen: function () {
        let server = http.createServer(function requestListener(req, res) {
            if (!res.send) {
                res.send = function (body) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                }
            }
            for (let i = 1; i < router.length; i++) {
                if ((req.url === router[i].path || router[i] === '*') &&
                    (req.method === router[i].method || router[i].method === '*')) {
                    return router[i].handle && router[i].handle(req, res)
                }
            }
            return router[0].handle && router[0].handle(req, res)
        })

        return server.listen.apply(server, arguments)
    }
}