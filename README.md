# Getting started with the fullstack Todo App

## Clone the git repo
`$git clone https://$hub.com/skattel49/notes_ripoff`

## Clone the backend of the project
`$git clone https://github.com/skattel49/CRUD_API_NODE_MONGOOSE.git`

## create a docker-compose.yml file
`$touch docker-compose.yml`
## copy the contents of the docker-compose file to docker-compose.yml
```yaml
version: "3.0"
services:
    frontend:
        container_name: notes_ripoff_frontend
        build: ./notes_ripoff/
        ports:
            - "2001:3000"
    backend:
        container_name: notes_ripoff_backend
        build: ./CRUD_API_NODE_MONGOOSE
        restart: always
        ports:
            - "2000:3001"
    mongo:
        container_name: mongo
        image: mongo
        restart: "always"
        ports:
            - "27017:27017"
```

## Create docker images
`$docker-compose up`

## View it in your browser
Access the project at [http://localhost:2001](http://localhost:2001)

You can also run the images as such:
`$docker run -d image_name `

Hope you enjoy it. Lastly, this is a personal project so I did not pass in
environment variables to mongo image for authentication.