# PostworkBeduBack

## Integrantes del equipo

- [Rogelio Magaña Tapia](https://github.com/MaganaRogelio)
- [Diego Domínguez Melo](https://github.com/POWRFULCOW89)

## Instalación

1. Clonar:

    ```sh
    gh repo clone SupaStar/ProyectoFinalBackBedu
    ```

    o [descargar](https://github.com/SupaStar/ProyectoFinalBackBedu/archive/refs/heads/main.zip) el repositorio como ZIP. 

2. Instalar las dependencias:

    ```sh
    npm i 
    ```

3. Ejecutar las pruebas:

    ```sh
    npm test
    ```

4. Ejecutar la aplicación:

    ```sh
    npm run dev
    ```

Se requiere de un archivo `.env` en la raíz del proyecto con las entradas `MONGO_URI` para el funcionamiento de la API y `SAMPLE_TOKEN` para la ejecución de las pruebas; en caso de que `NODE_ENV` sea distinto a `production`.

## Pila técnica

Se trata de una API construida con [Express](https://expressjs.com/es/), un framework backend para el entorno de ejecución Node.js. [Mongoose](https://mongoosejs.com) se utiliza como Object Document Mapper en conjunción con la base de datos no relacional [MongoDB](https://www.mongodb.com/es). Las pruebas unitarias son modeladas con [Chai](https://www.chaijs.com) y ejecutadas en [Mocha](https://mochajs.org). Como sistema de autenticación, se cuenta con [Passport](http://www.passportjs.org).

## Especificación del proyecto

### 1. Definan en equipo cuál será la temática de su proyecto

API para un punto de venta de una tienda miscelánea

### 2. Definan los requerimientos del proyecto, así como su estructura, es decir, respondan las preguntas

- ¿Qué espero que haga el proyecto?
  - Se espera que la API pueda proporcionar endpoints para el registro, ventas y administración del inventario.

- ¿Qué tipos de usuario tendrá nuestro sistema?
  - Administrador: Dueño del local
    - Generar reportes
    - Administración de inventario
    - Contaduría
    - Administracion de usuarios
  - Gerente:
    - Administración de inventario
  - Cajero:
    - Encargado de ventas

- ¿Qué acciones puede realizar cada usuario?
  - Administrador:
    - Generar reportes por periodos de ventas
    - CRUD inventario
    - CRUD usuarios
  - Gerente:
    - CRUD inventario
  - Cajero:
    - Realizar  y eliminar ventas
    - Aperturar y cerrar cajas

- ¿Qué información se necesita?
  - Cantidad de productos dentro del inventario, cantidad de productos vendidos y el costo total de estos.

- ¿Cuáles son las principales entidades?
  - Admin, gerente, cajero, venta, producto

- ¿Qué características tiene cada entidad?
  - Producto: Nombre de producto, categoría, stock, precio, código.
  - Usuario: Nombre de usuario, nombre, email, contraseña, rol.
  - Venta: Productos, cantidad, subtotal, total.

- ¿Qué funcionalidades tiene cada entidad?
  - Producto: CRUD
  - Usuario: CRUD, iniciar sesión
  - Venta: CRUD

- Utilicen historias de usuario para ayudarte a responder las preguntas del inciso anterior.
  - Administrador:
    - Yo administrador, me gustaria poder generar reportes por periodos
    - Yo administrador quiero tener control sobre los productos
    - Yo administrador quiero administrar mis usuarios
  - Gerente:
    - Yo gerente quiero poder añadir, eliminar, actualizar los productos.
  - Cajero:
    - Quiero poder generar una venta
    - Quiero poder eliminar ventas

### 4. Definan en JavaScript las clases que representen cada entidad de su proyecto

[Modelos](./models)

## Sobre el proyecto

Dado que la aplicación se encuentra hospedada en un tier básico de Heroku, entrará en modo de inactividad tras cierto tiempo sin conexiones. Para su uso, basta con realizar cualquier petición para que la aplicación reciba un ping y reanude su ejecución, tras un corto tiempo.

### Enlaces relevantes

#### [Documentación Swagger](https://app.swaggerhub.com/apis-docs/Bedu-Back-19/ProyectoFinalBack/1.0.2)
#### [API pública](https://proyectofinalback19.herokuapp.com/v1)
#### Vídeo
