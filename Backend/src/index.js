const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/job_portal')

app.use('/api/auth', require('./routes/auth'))

app.get('/', (req, res) => res.send('Job Portal backend running'))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
