const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
})

server = app.listen(3000, () => {
            console.log(`your server running on port %s `, 3000)
         })

const io = require('socket.io')(server);

// listen on every connection
io.on('connection', (socket) => {
    console.log('New USER CONNECTED!');

    // default username
    socket.username = "Anonymous";

    // Listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        // broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

    // listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
    })
});