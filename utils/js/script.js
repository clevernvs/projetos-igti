var rangeRed = null;
var rangeGreen = null;
var rangeBlue = null;
var panelColor = null;
var inputViewRed = null;
var inputViewGreen = null;
var inputViewBlue = null;

function start() {
  mapInputs();
  addEvents();
  viewRedValues();
  viewGreenValues();
  viewBlueValues();
  modifyPanelColor();
  //modifyRGB();
}

function mapInputs() {
  rangeRed = document.querySelector('#rangeRed');
  rangeGreen = document.querySelector('#rangeGreen');
  rangeBlue = document.querySelector('#rangeBlue');

  inputViewRed = document.querySelector('#inputViewRed');
  inputViewGreen = document.querySelector('#inputViewGreen');
  inputViewBlue = document.querySelector('#inputViewBlue');

  panelColor = document.querySelector('#panelColor');
}

function addEvents() {
  rangeRed.addEventListener('input', handleInputRedChange);
  rangeGreen.addEventListener('input', handleInputGreenChange);
  rangeBlue.addEventListener('input', handleInputBlueChange);
}

function handleInputRedChange(event) {
  inputViewRed.value = event.target.value;
  viewRedValues();
}

function handleInputGreenChange(event) {
  inputViewGreen.value = event.target.value;
  viewGreenValues();
}

function handleInputBlueChange(event) {
  inputViewBlue.value = event.target.value;
  viewBlueValues();
}

function viewRedValues() {
  var number = rangeRed.value;
  return number;
}

function viewGreenValues() {
  var number = rangeGreen.value;
  return number;
}

function viewBlueValues() {
  var number = rangeBlue.value;
  return number;
}

function modifyPanelColor() {
  var r = inputViewRed.value;
  var g = inputViewGreen.value;
  var b = inputViewBlue.value;

  var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';

  document.getElementById('panelColor').style.backgroundColor = rgb;
}

start();
