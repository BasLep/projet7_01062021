# projet7_01062021

## Project Setup :

npm i

## Compiles and hot-reloads for development :

### For frontend party :

cd frontend
npm i
npm run serve

### For backend party :

cd backend
npm i
"""
if necessary :
npm i --save-dev sequelize-cli
"""

#### create dotenv file (.env)

Add:
"""
ACCESS_TOKEN_SECRET= (need a random string here)

NAMEDB="groupomania"

USERDB="root"

PASSWORDDB=""
"""

#### create database and table

sequelize db:create
sequelize db:migrate

nodemon server
