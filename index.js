const express = require("express");
const bodyParser = require("body-parser").json();
const cors = require("cors");
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

app.post("/age_to_points", bodyParser, (request, response) => {
  var output = {};
  age = request.body.age;
  output.points = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;
  output.age = age;
  response.type("application/json");
  response.send(output);
});

app.post("/bmi_to_points", bodyParser, (request, response) => {
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

app.post("/bp_to_points", bodyParser, (request, response) => {
  var output = {};

  systolic = request.body.systolic;
  diastolic = request.body.diastolic;

  if (systolic > 180 || diastolic > 120) {
    output.points = 100;
    output.bp = "crisis";
  } else if (systolic >= 140 || diastolic >= 90) {
    output.points = 75;
    output.bp = "stage 2";
  } else if (
    (systolic >= 120 && systolic < 130) ||
    (diastolic >= 80 && diastolic < 90)
  ) {
    output.points = 15;
    output.bp = "elevated";
  } else if (systolic >= 130 || diastolic >= 80) {
    output.points = 30;
    output.bp = "stage 1";
  } else if (systolic < 120 && diastolic < 80) {
    output.points = 0;
    output.bp = "normal";
  } else {
    output.bp = "other";
    output.points = 0;
  }

  response.type("application/json");
  response.send(output);
});

app.post("/disease_to_points", bodyParser, (request, response) => {
  //Here is the disease calculator
  output = {};
  diabetis = request.body.diabetis;
  cancer = request.body.cancer;
  alzhe = request.body.alzhe;

  if (cancer == False && diabetis == False && alzhe == False){
    output.points = 0;
  }else if (cancer == False || diabetis == False || alzhe == Fasle){
    output.points = 20;
  }else{
    output.points = 10;
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
