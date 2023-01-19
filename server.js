import debug from 'debug';
debug('comp-229');
import http from 'http';

import app from './app/app.js';

const PORT = normalizePort(process.env.PORT || 3000);

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val){
    var port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() 
{
  let addr = server.address();
  let bind = 'pipe ' + addr;
  debug('Listening on ' + bind);
}


// //UPLOADING AN IMAGE TO MONGODB SERVER
// //const express = require('express');
// const multer = require('multer');
// const appE = express();
// const upload = multer({ dest: 'uploads/' });

// appE.post('/upload', upload.single('photo'), (req, res) => {
//   // The uploaded file is available as req.file
//   console.log(req.file);

//   // You can now proceed to save the file to your database, using MongoDB or any other database system.
// });
