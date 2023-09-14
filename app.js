const downloadBtn = document.getElementById("download");
const doctorForm = document.getElementById("doctor-form");
const patientForm = document.getElementById("patient-form");

const canvas = document.querySelector("canvas");
// 140, 85
// 665, 120

const ctx = canvas.getContext("2d");
const MAIN_WIDTH = 800;
const MAIN_HEIGHT = 575;
canvas.width = MAIN_WIDTH;
canvas.height = MAIN_HEIGHT;

const DOCTOR_WIDTH = 240;
const DOCTOR_HEIGHT = 110;

const PATIENT_WIDTH = 235;
const PATIENT_HEIGHT = 170;

window.onload = function() {
  const image = new Image();
  image.src = "addiction_blank.png";
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
  }
}

function onDoctorSays(event) {
  event.preventDefault();
  const doctorText = doctorForm.querySelector("input").value;
  ctx.clearRect(10, 10, DOCTOR_WIDTH, DOCTOR_HEIGHT);
  ctx.fillStyle = "white";
  ctx.fillRect(10, 10, DOCTOR_WIDTH, DOCTOR_HEIGHT);
  displayText(ctx);
  let doctorSays = wrapText(ctx, doctorText, 20, 40, DOCTOR_WIDTH, 30);
  doctorSays.forEach(function(item) {
    ctx.fillText(item[0], item[1], item[2]);
  })
}

function onPatientSays(event) {
  event.preventDefault();
  const patientText = patientForm.querySelector("input").value;
  ctx.clearRect(550, 40, PATIENT_WIDTH, PATIENT_HEIGHT);
  ctx.fillStyle = "white";
  ctx.fillRect(550, 40, PATIENT_WIDTH, PATIENT_HEIGHT);
  displayText(ctx);
  let patientSays = wrapText(ctx, patientText, 550, 40, PATIENT_WIDTH, 30);
  patientSays.forEach(function(item) {
    ctx.fillText(item[0], item[1], item[2]);
  })
}

function displayText(ctx) {
  ctx.font = "30px HakgyoansimMalgeunnalB";
  ctx.fillStyle = "black";
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "addiction_meme.png";
  a.click();
}

doctorForm.addEventListener("submit", onDoctorSays);
patientForm.addEventListener("submit", onPatientSays);
downloadBtn.addEventListener("click", onSaveClick);

// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.
// @param x - the X starting point of the text on the canvas.
// @param y - the Y starting point of the text on the canvas.
// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
const wrapText = function(ctx, text, x, y, maxWidth, lineHeight) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(' ');3
  let line = ''; // This will store the text of the current line
  let testLine = ''; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for(var n = 0; n < words.length; n++) {
      // Create a test line, and measure it..
      testLine += `${words[n]} `;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      // If the width of this test line is more than the max width
      if (testWidth > maxWidth && n > 0) {
          // Then the line is finished, push the current line into "lineArray"
          lineArray.push([line, x, y]);
          // Increase the line height, so a new line is started
          y += lineHeight;
          // Update line and test line to use this word as the first word on the next line
          line = `${words[n]} `;
          testLine = `${words[n]} `;
      }
      else {
          // If the test line is still less than the max width, then add the word to the current line
          line += `${words[n]} `;
      }
      // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
      if(n === words.length - 1) {
          lineArray.push([line, x, y]);
      }
  }
  // Return the line array
  return lineArray;
}
