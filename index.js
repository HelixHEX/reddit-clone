import 'reflect-metadata';
import 'dotenv-safe/config'
import express from 'express';
import expressHandleBars from 'express-handlebars';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  morgan(
    ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

app.engine('handlebaars', expressHandleBars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
})

