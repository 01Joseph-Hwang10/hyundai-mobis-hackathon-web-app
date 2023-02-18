import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const start = async () => {
  const app = express()

  const admin = new AdminJS({
    rootPath: '/'
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(port, () => {
    console.log(`AdminJS started on http://${host}:${port}${admin.options.rootPath}`)
    admin.watch();
  })
}

start()