import express from "express"
import router from "./routes/film.routes.js"
import cors from "cors"
import fileUpload from "express-fileupload"

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`Запуск был произведен на порту ${PORT}`))