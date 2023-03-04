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

app.post("/calculate_bmi", bodyParser, (request, response) => {
  var output = {};

  height = request.body.height * 0.0254;
  weight = request.body.weight / 2.2;
  bmi = weight / Math.pow(height, 2);

  if (bmi >= 18.5 && bmi < 25) {
    output.points = 0;
    output.bmi = "normal";
  } else if (bmi < 30) {
    output.points = 30;
    output.bmi = "overweight";
  } else {
    output.bmi = "other";
  }

  response.type("application/json");
  response.send(output);
});

app.post("/calculate_bp", bodyParser, (request, response) => {
  bp = request.body.systolic + "/" + request.body.diastolic;
  response.type("application/json");
  response.send(bp);
});

app.post("/calculate_disease", bodyParser, (request, response) => {
  //Here is the disease calculator
  risk = {};

  const diabetis = request.body.diabetis
  const cancer = request.body.cancer
  const alzhe = request.body.alzhe

  if (alzhe && cancer && diabetis != True) {
    output.points = 0;
  } else if (alzhe == True ||  cancer == True || diabetis == True) {
    output.points = 10;
  } else if (alzhe == True && cancer == True || cancer == True || diabetis == True) {
    risk.risk = "High Risk";
  } else {
    risk.risk = "Uninsurable";
  }


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
