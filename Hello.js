// function accepts app reference to express module to create routes here. We could have used the new arrow function syntax instead
export default function Hello(app) {
  app.get('/hello', (req, res) => { res.send('Life is good!') }) // http://localhost:4000/hello responds "Life is good"
  app.get('/', (req, res) => { res.send('Welcome to Full Stack Development!') }) // http://localhost:4000 responds "Welcome to Full Stack"
}