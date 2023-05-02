# Mamarecipe (Backend)

<!-- Logo -->
<p align="center">

  <h3 align="center">Mama Recipe</h3>
  <p align="center">
    <image align="center" width="400" src='./public/mamarecipelogo.png' />
  </p>

  <p align="center">
    <br />
    <a href="https://github.com/IchsanR/mamarecipe-frontend"><strong>Explore Frontend docs »</strong></a>
    <br />
  </p>
</p>

<!-- Table of Contents -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Project Structure](#project-structure)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup .env example](#setup-.env-example)
- [Contributing](#contributing)
- [Related Project](#related-project)

<!-- About The Project -->

## About The Project

Mamarecipe Backend is an API used for [Mama Recipe](https://mamarecipe-frontend.vercel.app/). This API handles every functions in Food Recipes Application, such as:
- User   : Register, login, forget password, update account
- Recipe : Insert new recipe, delete recipe, like a recipe, save a recipe, and get list of recipe

### Project Structure

```
|── mamarecipe-backend
   |── public            # Public Assets
   |── src               # Project source code
       |── config        # Database configuration
       |── controller    # Request controller
       |── helper        # Cloudinary, env, JWT, response configuration
       |── middleware    # Middleware configuration
       |── model         # Database query
       |── router        # API Endpoint routes
   |── .env              # Environment variables
   |── .gitignore        # Files that should be ignored
   |── db.sql            # Database setup
   |── index.js          # Index file
   |── README.md         # Readme
```

### Built With

This app was built with some technologies below:

- [Node JS](https://nodejs.org/en/docs/)
- [Express JS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [CORS](https://www.npmjs.com/package/cors)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Pg](https://www.npmjs.com/package/pg)

<!-- Getting Started -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [Node.js](https://nodejs.org/en/download/)
- [React.js](https://reactjs.org/docs/create-a-new-react-app.html)

### Installation

- Clone the repository

```sh
git clone https://github.com/IchsanR/mamarecipe-backend.git
```

- Go to repository folder

```sh
cd mamarecipe-backend
```

- Install Module

```
npm install / npm i
```

- Connect with database
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm start` To Monitoring Backend Activities

### Setup .env example

Create .env file in your root project folder.

```env
DB_HOSTNAME=[DATABASE_HOSTNAME]
DB_USERNAME=[DATABASE_USERNAME]
DB_PASSWORD=[DATABASE_PASSWORD]
DB_NAME=[DATABASE_NAME]
DB_PORT=[DATABASE_PORT]
JWT_SECRET=[YOUR_JWT_SECRET_KEY]
CLOUD_NAME = [YOUR_CLOUDINARY_CLOUD_NAME]
API_KEY = [YOUR_CLOUDINARY_API_KEY]
API_SECRET = [YOUR_CLOUDINARY_API_SECRET]
```

<!-- Contributing -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your-branch`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin your-branch`)
5. Open a Pull Request

<!-- Related Projects -->

## Related Project

:rocket: [`Mamarecipe (Frontend)`](https://github.com/IchsanR/mamarecipe-frontend)

:rocket: [`Demo Project`](https://mamarecipe-frontend.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>
