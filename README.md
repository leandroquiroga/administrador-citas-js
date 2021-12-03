# Administrador de Citas con IndexdDB PWA
Esta aplicación esta construida con la intención de simular un programa que controla citas personalizadas. Todas las citas se guardan en una Base de datos en este caso se uso IndexdDB que simula un CRUD basico. 

# Dektop  🖥 
![Validator](https://user-images.githubusercontent.com/80013958/135516753-78a37778-778a-4b28-8b03-dc59627643d0.gif)

# Mobile 📱
![mobile](https://user-images.githubusercontent.com/80013958/135516932-e0d05d52-c0c0-4c8d-b8f3-99074f5e4afa.gif)

# Construido con 🛠️
* HTML5
* CSS3 
* JavaScript
* Bootstrap 
* Moment.js
* Parcel.js
* Babel.js
* Jest.js

# Empaquetador  📦
A este proyecto tiene un empaquetador, este caso parcel.

### `npm run dev`
Para correrlo en modo de desarrollo <br>
Abre en nuestro navegador [http://localhost:1234](http://localhost:1234)

### `npm run build`
Para correlo en modo producción, crea una carperta llamada "dist" que optimiza la aplicacion al maximo. 

Para mas informacion: 🧾 [Documentacion de Parcel](https://es.parceljs.org/getting_started.html)

# Funcionalidades ⚙️

## Validaciones del formulario: 
Este formulario cuenta con validacion desde expresiones regulares en 
todos los campos excepto los de fecha y hora. Por ejemplo si en el campo donde nos pide el nombre ponemos numeros nos mostrara un error y hasta que no lo completemos de manera correcta no desaparece

## Validacion Incorrecta 
![Error](https://user-images.githubusercontent.com/80013958/135517045-0b726d77-a3a7-4ad7-bc5e-2b934958b803.gif)

## Crear Cita 
Para crear un cita primero debemos pasar la validacion de todos los campos del formulario. Un vez compleado el formulario se habilata el boton para crear una nueva cita 

## Base de datos IndexdDB
Por cada cita creada se nos aloja en la base de datos dentro de nuestro navegador. Podemos eliminar y editar nuestras citas, que se alojan en la bases de datos del navegador. 

## Eleccion de fechas
La eleccion de las fechas hay que tener en cuenta 2 puntos:

1) El día actual que estamos transcurriendo
2) La cantidas de dias que contiene el mes en curso. 

*   A partir de esto solo se puede elegir la fecha actual o posterior del mismo mes. Por ejemplo:

    * Si estamos transcurriendo el dia 15 NO podemos elegir fechas menores a 15 <br>
    * Si estamos transcurriendo el dia 29 y queremos elegir dias del proximo mes, no vamos a poder. 

Con los horarios pasa algo similar en este caso vamos a poder elegir en un rango entre las 09:00hs a 18:00hs con un intervalo de 1600 segundos.

## Deploy 👨‍💻
[![Netlify Status](https://api.netlify.com/api/v1/badges/1e29db7c-b497-490e-9bb7-13640df9eb7e/deploy-status)](https://adminitracioncitas.netlify.app/)

## Posibles mejoras 🚀
* Mensaje de confirmacion al editar una cita
* Mejor responsive desing 


# Contacto 📫
- [Linkedin](https://www.linkedin.com/in/leanquiroga95/)
- [Email](mailto:leandroquiroga9514@gmail.com)

# New Update 💣
* Se ha modificado para que sea una aplicacion PWA 
* Se ha hechos test para la verificacion de datos que agregamos, editamos y eliminamos nuestras citas

# Autor 👤
Realizado con ❤️ por [Leandro Quiroga](https://github.com/leandroquiroga);

