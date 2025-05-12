var app = require("express")();
var {Client} = require("pg");
var crypto = require("crypto");
var ConsistentHash = require("consistent-hash");
var hr = new ConsistentHash(); // hr -> Hash Ring

hr.add("5432");
hr.add("5433");
hr.add("5434");

var clients = {
  "5432": new Client({
    "host": "localhost",
    "port": "5432",
    "user": "myuser",
    "password": "mypassword",
    "database": "mydb"
  }),
  "5433": new Client({
    "host": "localhost",
    "port": "5433",
    "user": "myuser",
    "password": "mypassword",
    "database": "mydb"
  }),
  "5434": new Client({
    "host": "localhost",
    "port": "5434",
    "user": "myuser",
    "password": "mypassword",
    "database": "mydb"
  })
};

connect();

async function connect() {
  await clients["5432"].connect();
  await clients["5433"].connect();
  await clients["5434"].connect();
};

app.get("/", (req, res) => {

});

app.post("/", async (req, res) => {

  var url = req.query.url;

  // consistently hash this to get a port!
  var hash = crypto.createHash("sha256").update(url).digest("base64");
  var urlId = hash.substring(0, 5);

  var server = hr.get(urlId);

  await clients[server].query("INSERT INTO URL_TABLE(URL, URL_ID) VALUES ($1, $2)", [url, urlId]); 

  res.send({
    "hash": hash,
    "urlId": urlId,
    "url": url,
    "server": server
  })
});

app.listen(8081, () => {
  console.log("Listening to 8081");
});