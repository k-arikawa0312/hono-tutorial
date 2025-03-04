import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import blogs from './blogs/blogs'

const app = new Hono()
app.route("/posts", blogs)

app.use("*", prettyJSON())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


export default app
