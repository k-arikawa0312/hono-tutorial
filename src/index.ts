import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import blogs from './blogs/blogs'
import auth from './auth/auth'

const app = new Hono()
app.route("/posts", blogs)
app.route("/auth", auth)

app.use("*", prettyJSON())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


export default app
