import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3005

// Para resolver el __dirname en ESModules, usamos fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Servir archivos estáticos desde la carpeta dist/client
app.use(express.static(path.join(__dirname, 'dist', 'client')))

// Aquí manejamos SSR
app.get('*', (req, res) => {
  const indexFile = path.join(__dirname, 'dist', 'server', 'index.html')

  fs.readFile(indexFile, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err)
      return res.status(500).send('Algo salió mal!')
    }

    // Aquí puedes realizar el procesamiento de SSR si es necesario (por ejemplo, renderizar con React)
    res.send(data)
  })
})

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`)
})
