import App from './app';

new App().server.listen(3333, () => {
  console.log('Servidor ligado!');
});
