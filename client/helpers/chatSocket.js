const chatSocket = io('http://localhost:3000', {
  query: {
    roomType: 'chat',
  },
});

export default chatSocket;
