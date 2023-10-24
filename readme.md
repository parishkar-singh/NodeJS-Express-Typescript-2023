
# NODEJS + EXPRESS BACKEND 2023

This is the NodeJS starter pack, Node + Express server written in typescript.
This is production ready code with all the security features implemented.


## API Reference

#### Create User

```http
  POST /api/users {name,email,password,passwordConfirmation}
```
#### Delete All Users
```http
  DELETE /api/users
```
#### Page
```http
  POST /sessions/   {email,password}
```
#### Get All Page Sessions
```http
  GET /sessions/   {refreshToken,accessToken}
```

All the routes are protected only the logged in person can see his all the sessions


## Deployment

To run the server:

```bash
  npm run dev
```

To run the server in EC2 and get it online forever :)

```bash
  npm run server 
```
Few Other Commands

```bash
  npm run start (To start server if it was paused) 
  npm run kill  (To kill the server for good :() )
  npm run stop  (The not so interesting way to stop it )
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. RSA should be 2048 bits. Look for .env.example configured with some default values

`PORT`
`DBURI`
`SALT_WORK_FACTOR`
`REFRESH_TOKEN_TTL='69d'`
`publickey`
`privatekey`
`ACCESS_TOKEN_TTL='15m'`
`REFRESH_TOKEN_TTL='69d'`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`GOOGLE_REDIRECT_URL`
`SMTP_USER`
`SMTP_PASS`

