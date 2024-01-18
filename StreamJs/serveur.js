const http = require('http');
const fs = require('fs');
const path = require('path'); 
const express = require('express')
const app = express();


// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Arbane')));
// Toutes les autres requêtes redirigées vers le fichier HTML
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'paysage.mp4'));
});

app.listen(3004, () => {
console.log('Serveur démarré sur http://localhost:3004');
});
