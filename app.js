require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const prodRoutes = require('./routes/products')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')


app.get('/', (req, res) => {
    res.send('<h1>Prods</h1><a href="api/v1/products">Products</a>')
})

app.use('/api/v1/products', prodRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start  = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('on air'))
    } catch (error) {
        console.log(error)
    }
}

start()