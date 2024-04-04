const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
  username: 'jeanmarcos',
  password: '123'
}

// curl -X POST --data '{"username": "jeanmarcos", "password": "123"}' http://localhost:3000/login 

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'))

    if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
      response.writeHead(401)
      response.end('loggin failed')
      return
    }

    response.end('login successfull')
    return
  },
  default: (request, response) => {
    response.writeHead(404)
    response.end('not found')
    return
  }
}

function handler(request, response) {
  const { url, method } = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default

  return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('running at port 3000'))

module.exports = app