Client: https://uncluttr.onrender.com/
Server: https://uncluttr-server.onrender.com

# User Stories

🐿️ As a user, I want the app to be fast and responsive so that I can browse without delays. ☑️
🐿️ As a user, I want to read and add posts so that I can interact with the community. ☑️
🐿️ As a user, I want a simple and intuitive form for creating new posts so that the process feels effortless. ☑️
🐿️ As a user, I want to view multiple pages so that I can easily find the content I’m looking for. ☑️
🐿️ As a developer, I want to build a database schema and seed the database with realistic data for accurate testing and development. ☑️
🐿️ As a user, I want to be able to view all of the posts within the database so that I can explore all available content. ☑️
🐿️ As a developer, I want to use .map() to display all posts to efficiently display fetched data. ☑️
🐿️ As a developer, I want to poll my database to render any new data stored in
there efficiently. ☑️

# Requirements

🎯 Create a client using React. ☑️
🎯 Use Express to create your server, using both GET and POST endpoints. ☑️
🎯 Build a React form for users to create posts. ☑️
🎯 Create multiple pages using React Router. ☑️
🎯 Design a database schema, and seed the database with some realistic data. ☑️
🎯 Use SQL to retrieve posts from the database in your Express server. ☑️
🎯 Display all posts using .map(). ☑️
🎯 Use an interval and useEffect() to poll your database. ☑️

# Reflection

## General

This is the first time I believe I really struggled with an assignment and bit off more than I was able to chew. Not because the code was super difficult it was just the amount needed to build the app. Every little step had to be added either the server or client. Every time a button needed to do something it had to meticously build. Once I had the structure of my Post and Get routes, I know what I had to do it was just the amount of routes and the time needed to put it all in place.

I think in future I need to be aware of what is possible in what time frame.

However, I really enjoy REACT. I feel much more comfortable building apps than I did with js and DOM. The strucutre is more straightforward and once you know how to add everything together it is quite simple to build the individual components. I also feel like there is a lot more resource out there that has helped me massively with the design.

One thing that took longer was the timer set up in the Single Task form. It took me some time to read through how to create a countdown from the time in the database. I have seen that there are npm templates for these, so might in future use one of those. But I'm proud that I managed it.

The reason I have been so focused to get this app running is also that this is osmething close to my heart, so having the basic funcionality is something that was important to me. I'm looking forward now to learn about Next.js and authenticator to build this out a litte more to make it usable in the real world.

However I appreciate any feedback on usability or if there is anything I could improve.

## Render Issue

Once deplyed I was unable to access any of my routes on render. I read up on it and it states that when using react-route, an overwrite is needed. So i added Source: /\* Destination: /index.html Action: Rewrite. This has worked but I'm unsure if that was the right method.

# Resources

Displaying time and dates for completed tasks:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString

Countdown and timers:

https://www.freecodecamp.org/news/build-a-countdown-timer-with-react-step-by-step/

Render:

https://render.com/docs/redirects-rewrites

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/35ji4Mp8XPLpSbVOFIIObz/Uncluttr?node-id=2-10&embed-host=share" allowfullscreen></iframe>
