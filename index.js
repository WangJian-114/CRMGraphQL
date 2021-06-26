const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken');
const conectarDB = require('./config/db');
require('dotenv').config({ path: 'variables.env' })

// Conectar a la base de datos
conectarDB();

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // console.log(req.headers['authorization']);
        const token = req.headers['authorization'] || '';
        // console.log(req.headers);

        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRETA);
                // console.log(usuario);

                // Para consumirlo hay que hacerle un return
                return {
                    usuario
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
});



// Arrancar el servidor
server.listen({port: process.env.PORT || 4000 }).then(({url})=> {
    console.log(`Servidor listo en la URL ${url}`)
});