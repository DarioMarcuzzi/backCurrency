## backCurrency
El servidor backCurrency es una parte integral de la aplicación MicroFrontQNEWSAPP. Se encarga de recibir solicitudes de la microaplicación relacionada con las cotizaciones de monedas y proporcionar datos actualizados sobre las monedas más relevantes del mercado.
Estos datos se obtienen consultando una API externa y se almacenan en una base de datos para su uso posterior en la aplicación.

## Funcionalidades
<ul>
<li>  
Escucha las solicitudes de la microaplicación de cotizaciones de monedas.
</li>
  <li>
Consulta una API externa para obtener los datos de cotización actualizados.
  </li>
  <li>
Formatea los datos recibidos y los almacena en una base de datos local.
  </li>
  <li>
Proporciona los datos de cotización de las monedas a la microaplicación cuando se le solicita.
  </li>
</ul>

## Configuración
Antes de ejecutar el servidor backCurrency, asegúrese de cumplir con los siguientes requisitos:
<ol>
  <li>
Node.js y npm instalados en su entorno de desarrollo.
  </li>
  <li>
Conexión a Internet para consultar la API externa de cotizaciones de monedas.
  </li>
  <li>
Configuración de la base de datos PostgreSQL, incluyendo la creación de una base de datos y la configuración de las credenciales de conexión.
  </li>
</ol>

## Instalación
Siga estos pasos para instalar y ejecutar el servidor backCurrency:
<ol>
  <li><strong>
Clone este repositorio en su computadora local.
  </strong></li>
  <li><strong>
Navegue hasta la carpeta del repositorio: cd backCurrency.
    
  </strong></li>
  <li><strong>
Ejecute el siguiente comando para instalar las dependencias: npm install.
    
  </strong></li>
  <li><strong>
Configure la conexión a la base de datos en el archivo .env. Asegúrese de proporcionar los valores correctos para  DB_HOST, DB_USER , DB_PASSWORD.
apikey=(https://rapidapi.com/exchangerateapi/api/exchangerate-api) 
    
  </strong></li>
  <li><strong>
Ejecute el siguiente comando para iniciar el servidor: npm start.
    
  </strong></li>
</ol>
El servidor backCurrency ahora está en funcionamiento y listo para recibir solicitudes de la microaplicación de mf-currency.
