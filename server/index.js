const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "blogapp",
  },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);

      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});

app.put("/posts", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
});

app.get("/allposts", (req, res) => {
  db.select("*")
    .from("posts")
    .orderBy("date_created", "desc")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json("unable to get posts"));
});
app.get("/allcomments", (req, res) => {
  const post_id = req.body.pid;
  db.select("*")
    .from("comments")
    .orderBy("date_created", "desc")
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => res.status(400).json("unable to get posts"));
});

app.post("/posttodb", (req, res) => {
  db.insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.id,
    date_created: new Date(),
  })
    .into("posts")
    .returning("body")
    .then((post) => {
      res.json(post[0]);
    })
    .catch((err) => res.status(400).json("unable to get post"));
});

app.post("/commenttodb", (req, res) => {
  const { pid, body, uid } = req.body;
  db.insert({
    comment: body,
    post_id: pid,
    user_id: uid,
    date_created: new Date(),
  })
    .into("comments")
    .returning("comment")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(400).json("unable to get post"));
});

app.put("/like", (req, res) => {
  const uid = String(req.body.uid);
  const pid = String(req.body.pid);

  db.select("*")
    .from("posts")
    .where("pid", "=", pid)
    .then((data) => {
      console.log(data);
      if (!data[0].like_user_id.includes(uid)) {
        return db("posts")
          .where("pid", "=", pid)
          .update({
            like_user_id: knex.raw("array_append(like_user_id, ?)", [uid]),
            likes: knex.raw("likes + 1"),
          })
          .returning("likes")
          .then((likes) => {
            console.log(likes);
            res.json(likes[0]);
          })
          .catch((err) => res.status(400).json("unable to get likes"));
      } else {
        res.status(400).json("can't like more than once");
      }
    })
    .catch((err) => res.status(400).json("an error occured try again later"));
});

app.listen(5000, () => {});
