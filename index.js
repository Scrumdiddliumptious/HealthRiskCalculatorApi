const express = require("express");
const bodyParser = require("body-parser").json();
const cors = require("cors");
const open = require("open");
app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/ping", (request, response) => {
  console.log("Ping recieved");
  response.type("text/plain");
  response.send("Pong!");
});

app.post("/calculate_risk", bodyParser, (request, response) => {
  risk = {};

  totalScore =
    request.body.age +
    request.body.bmi +
    request.body.bp +
    request.body.disease;

  console.log(request.body);
  risk.score = totalScore;

  if (totalScore <= 20) {
    risk.risk = "Low Risk";
  } else if (totalScore <= 50) {
    risk.risk = "Moderate Risk";
  } else if (totalScore <= 75) {
    risk.risk = "High Risk";
  } else {
    risk.risk = "Uninsurable";
  }

  response.type("application/json");
  response.send(risk);
});


app.post("/calculate_disease", bodyParser, (request, response) => {
  //Here is the disease calculator
  risk = {};
  const diabetis = request.body.diabetis
  const cancer = request.body.cancer
  const alzhe = request.body.alzhe

  
  

  response.type("application/json");
  response.send(risk);
});

// Custom 404 page.
app.use((request, response) => {
  response.type("text/plain");
  response.status(404);
  response.send("404 - Not Found");
});

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message);
  response.type("text/plain");
  response.status(500);
  response.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started at \"http://localhost:${port}\"\n` +
      `press Ctrl-C to terminate.`
  )
);
