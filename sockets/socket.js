const {io}  = require('../index');
const Bands = require('../models/bands');
const Band  = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Mettalica'));

console.log(bands);

io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('add-band', (payload) => {
        const newBand = new Band (payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
    // client.on('emitir-mensaje', (payload) => {
    //    // console.log(payload);
    //    // io.emit('nuevo-mensaje', payload); // emite a mensagem a todos
    //     client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos a quem enviou
    // });

});
