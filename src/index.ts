import express from 'express'
import path from 'path'
import { router } from './router'

const PORT = process.env.PORT || 3500

const app = express()

app.set('views', path.join(__dirname, 'client', 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'client', 'assets')))

app.use('/', router)

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`)
})
