import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

let posts = [{
  id: 1,
  name: 'Kitty Galore',
  content: 'Mew-mew-mew-mew mew-mew, mew-mew-mew-mew me!',
  created: 1700662349000,
  avatar: 'https://cdn2.thecatapi.com/images/MTY1ODc5MA.png',
  status: 'ex agent M.E.O.W.S.',
}];
let nextId = 2;

app.get('/posts', (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((el) => el.id === postId);

  res.send(JSON.stringify({ post: posts[index] }));
});

app.post('/posts', (req, res) => {
  posts.push({ ...req.body, id: nextId++, created: Date.now() });
  res.status(204);
  res.end();
});

app.put('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.map((el) => {
    if (el.id === postId) {
      return {
        ...el,
        ...req.body,
        id: el.id,
      };
    }

    return el;
  });

  res.status(204).end();
});

app.delete('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((el) => el.id === postId);

  if (index !== -1) {
    posts.splice(index, 1);

  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
