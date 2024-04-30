# blog-api

This project is an example of a blog's REST API for posts and comments built with Express.js and MongoDB. With this API, posts can be created/read/updated/deleted, and comments on those posts can also be manipulated with the same actions. API endpoints were tested through the command line with cURL. Examples of how cURL was used can be seen in the comments of the `routes/index.js` file.

The main purpose of this project was to gain experience building an API and understanding how the resources it outputs can be consumed by different types of client interfaces.

**Note**: This is purely backend code. I may come back to this project in the future to build a frontend showcasing the API endpoints in action.

## Features

- User authentication with `Passport.js` to ensure that certain actions (such as post deletion) are protected from anonymous users.
- CRUD operations on a MongoDB database using common HTTP request methods (POST, GET, PUT, and DELETE).

## Database Schema

![database schema](/database_schema.svg)

## Lessons Learned

- Running a backend server for an API and simultaneously running requests on its resources through the command line with cURL.
- Saving a cookie created through cURL into a text file. This cookie was created when I authenticated myself as the blog's primary author.
  - Afterwards, I learned how to send that cookie along with any request as proof of authentication.
  - Without this cookie, a session wouldn't persistent when running requests through cURL. This is an issue that I didn't run into from previous projects since I was primarily testing API calls through a web browser, which handles cookie storage and management with less user involvement.
- Unit testing routes, controllers, and database operations on a mock database with SuperTest + Jest.
