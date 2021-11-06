# Welfare Application

iwelfare Api

# Application Details

## Technologies

Currently,

<ul>
<li>NodeJs </li>
<li>ExpressJs</li>
<li>Sequelize: Database ORM</li>
<li>PostgreSQL Database</li>
<li>Sqlite</li>
<li>Jest</li>
  </ul>

## Application Set up

Enviroment variables are set in `.env` files and the examples can be seen in `env.examples`.

1. Create `.env` files in the root folder, and set the correct environment variables as stated in `env.examples`
2. Open terminal and navigate to the root folder.
3. Install all dependencies and also set up the `database` and `database migration` by running this command on the terminal

   ```
   - npm install
   - npm run migration
   - npm run seed
   ```

## Running the App (Development)

1. Open terminal and navigate to the root folder.
2. Run this command on terminal

```
    npm run dev
```

## Running the App (Production Instance)

1. Open terminal and navigate to the root folder.
2. Run this command on terminal

```
    - npm start
```

## Running the App (Unit testing)

1. Open terminal and navigate to the root folder.
2. Run this command on terminal

```
    - npm test
```

## API Documentation ( Sample)

The API documentation can be seen on

Application url: ``

## API Endpoint Route

Currently,

<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/login</td>
    <td>Login to the application with phone Number and password</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users</td>
    <td></td>
  </tr>
  <tr>
    <td>GET</td>
    <td></td>
    <td>
</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/booking</td>
    <td>Book a car by supplying the carId for currently logged in users</td>
  </tr>
 
  <tr>
    <td>GET</td>
    <td></td>
    <td>
</td>
  </tr>
  </table>
