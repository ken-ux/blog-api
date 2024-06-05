# blog-api

This project is an example of a blog's REST API for posts and comments built with Express.js and MongoDB. The API enables CRUD operations on posts; comments on those posts can also be manipulated with the same operations. API endpoints were tested through the command line with cURL. Examples of how cURL was used can be seen in the comments of the `routes/index.js` file.

The main purpose of this project was to gain experience building an API and understanding how the resources it outputs can be consumed by different types of client interfaces.

**Note**: This is purely backend code. There is no graphical interface for others to view. However, you can check out the [user interface](https://github.com/ken-ux/blog-frontend) and the [admin interface](https://github.com/ken-ux/blog-admin) to see how the API is being used.

## Features

- User authentication with `Passport.js` to ensure that specific actions (such as post deletion) are protected from anonymous users.
  - Authentication runs two `Passport.js` strategies: `passport-local` (for basic username and password) and `passport-jwt` (for signing and verifying JSON Web Tokens).
- CRUD operations on a MongoDB database using common HTTP request methods (POST, GET, PUT, and DELETE).

## Database Schema

![database schema](/database_schema.svg)

## Lessons Learned

- Running a backend server for the API and simultaneously running requests on its resources through the command line with cURL.
- Storing a cURL-created cookie into a text file. This cookie is created during testing to authenticate myself as a blog admin.
  - Afterwards, I learned how to send that cookie along with any request as proof of authentication.
  - Without the cookie, a session wouldn't persistent when running cURL requests. This is an issue that I didn't run into from previous projects since I was primarily testing API calls through a browser client, which inherently handles cookie storage and management.
- Unit testing routes, controllers, and database operations on a mock database with SuperTest + Jest.
- Creating and sending a JSON Web Token (JWT) on successful authentication.
- Verifying JWTs on protected API routes.
