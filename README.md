# Welcome to SocialPost

## Technologies Used
Backend Technology:
- Nodejs
- Expressjs
- Mongodb

Frontend Technology:
- ReactJs
- Bootstrap
- react-bootstrap (for better optimization)

> To run the server type **'npm run dev'**
> To run the client type **'npm start'**


## Server
You can call the two endpoints provided, one for saving the photo to the database and another endpoint for retrieving the posted image.

#### Endpoints

``` /api/upload ```
This endpoint is used for posting the image and storing it in the Database.

```/api/image ```
This endpoint is used for retrieving the posted image.

>The response for this endpoint contains a arrayBuffer. One has to convert it into base64 string to render the image in the frontend.

### Files

| Files | Description |
| ----- | ----------- |
| server.js          | This file has required moduled imports, database import and routes import. |
| routes/index.js    | All routes are imported here and this file is imported in the server file. |
| routes/posts.js    | This file has two endpoints, /upload and /image.                           |
| db/index.js        | Sets up mongo connection                                                   |
| db/models/Posts.js | Has the model setup                                                        |
| fileupload/photos  | Uploaded Images are stored here.                                           |
| config/.env        | Sets environment variable.                                                 |

```js 
//Model Structure
Schema(
  img: {
  data: Buffer,
  contentType: String
  },
  text: String
)
```
> Timestamps enabled for the schema

## Client
Main layout uses react-bootstrap.

### Files


| Files | Description |
| ----- | ----------- |
| App.js                      | This file imports uploadImage component. |
| components/uploadImage.js   | Main structure code is here              |
| components/timeline.js      | Code for Displaying the uploaded photo   |
| styles/uploadImage.css      | Style for uploadImage Component          |
| styles/timeline.css         | Style for timeline Component             |



## Screenshots
[Initial - Deprecated](https://prnt.sc/tslesh)


[Final - Deprecated](https://prnt.sc/tslegk)
