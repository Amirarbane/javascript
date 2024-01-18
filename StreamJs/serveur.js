const http = require('http');
const fs = require('fs');
const path = require('path'); 
const range = require('range-parser');
const express = require('express')
const app = express();


// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Arbane')));
// Toutes les autres requêtes redirigées vers le fichier HTML
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'video.mp4'));
});

app.listen(3004, () => {
console.log('Serveur démarré sur http://localhost:3004');
});





const server = http.createServer((req, res) => {
    if (req.url === '/video') {
        const filePath = path.join(__dirname, 'video.mp4');
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;

        const rangeHeader = req.headers.range;
        const ranges = range(fileSize, rangeHeader, { combine: true });

        if (!ranges || ranges.type !== 'bytes' || ranges.length > 1) {
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': fileSize
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            // Valid range requested
            const start = ranges[0].start;
            const end = ranges[0].end;

            const chunkSize = (end - start) + 1;
            const stream = fs.createReadStream(filePath, { start, end });
            res.writeHead(206, {
                'Content-Type': 'video/mp4',
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Content-Length': chunkSize
            });

            stream.pipe(res);
        }
    } else {
        res.end('Page non trouvée');
    }
});
const ipAddress = '192.168.5.124'
const port = 3003;
server.listen(port, () => {
    console.log(`Serveur en cours d'écoute http://${ipAddress}:${port}`);
});
