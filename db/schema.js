const { gql } = require('apollo-server');

// Schemas
// En schema definimos tipo de objeto que va a devolver y las consultas
// Query es para hacer operaciones select 
// Mutation es para hacer creacion eliminacion modificacion etc con la DB
// !  significa que es require
const typeDefs = gql`
    type Usuario { 
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Token {
        token: String
    }

    type Producto { 
        id: ID
        nombre: String
        precio: Float
        existencia: Int
        creado: String
    }

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: Cliente
        vendedor: ID
        fecha: String
        estado: EstadoPedido
    }

    type PedidoGrupo {
        id: ID
        cantidad: Int
        nombre: String
        precio: Float
    }

    type TopCliente {
        total: Float
        cliente: [Cliente]
    }

    type TopVendedor {
        total: Float
        vendedor: [Usuario]
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    input PedidoProductoInput {
        id: ID
        cantidad: Int
        nombre: String
        precio: Float
    }

    input PedidoInput {
        pedido: [PedidoProductoInput]
        total: Float
        cliente: ID
        estado: EstadoPedido
    }

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    type Query {
        # Usuario
        obtenerUsuario: Usuario

        # Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!) : Producto

        # Clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!): Cliente

        # Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!) : Pedido
        obtenerPedidosEstado(estado: String!): [Pedido]

        # Busquedas Avanzadas
        mejoresClientes: [TopCliente]
        mejoresVendedores: [TopVendedor]
        buscarProducto(texto: String!) : [Producto]

    }

    type Mutation {
        # Usuarios 
        nuevoUsuario(input: UsuarioInput) : Usuario
        autenticarUsuario(input: AutenticarInput) : Token

        # Productos
        nuevoProducto(input: ProductoInput) : Producto
        actualizarProducto( id: ID!, input: ProductoInput) : Producto
        eliminarProducto(id: ID!) : String

        # Clientes
        nuevoCliente(input: ClienteInput) : Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!) : String

        # Pedidos
        nuevoPedido( input: PedidoInput) : Pedido
        actualizarPedido(id: ID!, input: PedidoInput ) : Pedido
        eliminarPedido(id: ID!) : String
    }

    
`;

module.exports = typeDefs;