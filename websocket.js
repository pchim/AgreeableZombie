import io from 'socket.io-client';

var socket = io.connect();
//I think the code below, is a test can we delete it?
// socket.on('highlight', (data) => {
//   console.log(data);
//   socket.emit('event2', { my: 'data' });
// });
export default socket;
