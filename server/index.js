const express = require('express')
const dataRouter = require('./routes/data.routes')
const PORT = process.env.PORT || 8080
const cors = require('cors')

const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)
app.use(express.json())
app.use('/api', dataRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))