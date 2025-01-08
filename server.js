import jsonServer from 'json-server';  // Import json-server
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jsonServerLib = require('json-server');
const server = jsonServerLib.create(); 
const router = jsonServerLib.router('mk_followup_database.json');  // Specify the database file
const middlewares = jsonServerLib.defaults();  // Default middlewares (like logging, CORS)

server.use(middlewares);  // Use the default middlewares
server.use(router);  // Use the router to handle requests

const PORT = 4000;  // Define the port
const HOST = '192.168.1.211';  // Define the host IP address

server.listen(PORT, HOST, () => {  // Start the server
  console.log(`JSON Server is running at http://${HOST}:${PORT}`);
});
