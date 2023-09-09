# Echo Chamber

In an era where music unites all, it's fitting to create a single page app that can encourage users to select a room, chat with strangers alike and share each others favourite music.

Users can post a YouTube URL which when selected by another user loads that video into an embedded iFrame player. Users can upvote video's that they like and video's with the most likes will be displayed at the top of the rooms playlist window.

## Technologies Used

- Javascript
- Express
- Postgres
- Prisma
- SocketIO

### Prisma

Prisma is an open source, modern database toolkit and ORM library for building performant web applications. Some of the key features and components of Prisma include:

- Database schemas: Ability to define data models to create tables and relationships
- Migrations: Think of it as version control (like git) but for databases. Allows us to build on the schema while keeping existing data
- Powerful query: A rich query API that allows us to query the database in a declarative and type-safe way

Prisma made it incredibly easy for us to connect the backend to our custom APIs, specifically with all the relationships within our tables but overall, it made our code a lot more pleasing to look at!

The **challenges** that came alongside Prisma was more about getting everyone on the same page with how to use it considering it's a very different experience for those who haven't seen a modern ORM solution. When there was an error in the code it would usually be because the migrations were out of sync with the database and/or schema which definitely had caused headaches for some. The error handling for Prisma is quite efficient though, with it outlining exactly what it was expecting and the data it actually got, so this helped with a lot of identifying: **"Hey this is actually undefined -- why?"**

**In the future** we should be thinking about implementing WebSockets instead, only because Prisma supports this natively through real-time events & subscriptions which, would have made our life a lot more easier. Of course hindsight is 20/20, but here is an example of how we can think of implementing this in the future:

```javascript
socket.on('sendMessage', async (message) => {
    // Save the message to the database using Prisma
    const savedMessage = await prisma.message.create({
      data: {
        text: message,
      },
    });

    // Emit the message to all connected clients
    io.emit('newMessage', savedMessage);
}

// Then we can listen (real-time) for incoming messages
socket.on('newMessage', (message) => {
  // Update the UI with the new message
  console.log('New message received:', message);
});
```

TLDR; we made it a little bit harder for ourselves!

## App Features

- Live chat with other users
- Create user accounts
- Swap between different rooms
- Add music or video to rooms current playlist via Youtube URL
- Listen to music and watch videos from the collaborative playlist with friends
- Like songs and videos in playlist to reorder by most likes
- Rooms current playlist, likes and messages will be stored in the database

## Chat

For the chatbox functionality we have chosen to use SocketIO to handle live messaging. A user will send a message which will then be passed to the server which then relays the message to all connected clients. This allows users to recieve messages in real-time without refreshing the page, creating an interactive experience with instant feedback for the user. Messages will be stored in the database and existing messages are loaded on render (e.g when joining a room).
All the user has to do is login, join a room, and send a message.

## YouTube API

In order to render video titles in the playlist we decided to use the YouTube API. We created a dummy route to the server to make the call which enabled us to store the projects API key as an environment variable.

## Challenges

This was our first major project working within a group environment so that alone came with a heap of challenges.

Firstly, early on it was clear that we would have a hard time being on the same page all the time. While we are all competent developers, it was more about **how** we can be aligned. As time moved on, we were able to have a much better idea on what the project was positioned to be.

**SocketIO**

This was our first time implementing SocketIO in a more complex project outside of a simple chat feature. A lot of bugs had appeared that took a lot of our time away.

## Things we did well

- Seperation of Functions: As the code became more complex it was necessary to break our code into manageable components. This required a lot of importing/exporting but it vastly improved navigating our codebase.
- Handling Socket and Database Requests Simultaneously: We needed to account for new users joining rooms as well as active users posting in the room without duplicating requests.
- Rendering Components: We opted to have our index.html load our HTML template, and have the data inside rendered dynamically. This allows us to only render data when it is needed, and prevent the need to render every component when changes happen.
