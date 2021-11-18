const {io} = require('../index');

io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});

    });


});
