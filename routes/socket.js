// export function for listening to the socket
module.exports = function (socket) {

   socket.emit('init', {
      foo: 'This is Foo',
      bar: 'This is bar'
   });

   // broadcast that a new connection has happend
   socket.broadcast.emit('connection:new');

   // broadcast a user's message to other users
   socket.on('message', function (data) {
      console.log('node::message', data);
      socket.broadcast.emit('message:new', {
         message: data.text
      });
   });
};
