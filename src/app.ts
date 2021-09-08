import express from 'express';

const url = 'https://www.amazon.com.br/';

const app = express();

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});