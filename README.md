# NPUA-GB-Digital-Library
NPUA GB Digital Library. This digital library is my first project. I did both the back-end and the front-end. It is possible to do a search, register, read online, or download, add to favorites, feedback, take a printed version of the book through a barcode and give a student who has his barcode , and the table shows which book each has.

## Installll

You should have Node.js (version 18 or more) in your server

Install all packages
```bash
    npm install ./Library_react/library_react
    npm install ./Library_react/server_of_client
    npm install ./Library_server
```

## Run

Build react and run server for sending index.html
```bash
    npm --prefix ./Library_react/library_react run build
    node ./Library_react/server_of_client/index.js
```

Run server
```bash
    node ./Library_server/libraryServer.js
```

