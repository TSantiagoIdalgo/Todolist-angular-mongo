import server from './src/server';
import mongodb from './src/database/db';

const PORT = process.env.PORT ?? 3001;

(async function main () {
  try {
    await mongodb();
    console.log('Connection with database has been established successfully');
    server.listen(PORT, () => {
      console.log('The server is listening on the port:', PORT);
    });
  } catch (error) {
    console.error(error);
  }
})();