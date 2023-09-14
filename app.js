const doctorDiv = document.getElementById("doctor-div");
const doctorBtn = doctorDiv.querySelector("button");
const patientDiv = document.getElementById("patient-div");
const patientBtn = patientDiv.querySelector("button");

const mainCanvas = document.getElementById("main-canvas");
// 140, 85
const doctorCanvas = document.getElementById("doctor-canvas");
// 665, 120
const patientCanvas = document.getElementById("patient-canvas");

const font = new FontFace('font', '');

mainCanvas.width = 800;
mainCanvas.height = 575;

const doctorCtx = doctorCanvas.getContext("2d");
doctorCanvas.width = 215;
doctorCanvas.height = 110;

patientCanvas.width = 235;
patientCanvas.height = 160;

window.onload = function() {
  const ctx = mainCanvas.getContext("2d");
  const image = new Image();
  image.src = "addiction_blank.png";
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
  }
}

function onDoctorSays(event) {
  const doctorText = doctorDiv.querySelector("input").value;
  console.log(doctorText);

  doctorCtx.font = "30px HakgyoansimMalgeunnalB";
  doctorCtx.fillStyle = "black";
  let doctorSays = wrapText(doctorCtx, doctorText, 0, 30, 205, 30);
  doctorSays.forEach(function(item) {
    doctorCtx.fillText(item[0], item[1], item[2]);
  })
}

function onPatientSays(event) {
  const patientText = patientDiv.querySelector("input").value;
  console.log(patientText);
  const ctx = patientCanvas.getContext("2d");
  ctx.font = "30px HakgyoansimMalgeunnalB";
  ctx.fillStyle = "black";
  let patientSays = wrapText(ctx, patientText, 0, 30, 225, 30);
  patientSays.forEach(function(item) {
    ctx.fillText(item[0], item[1], item[2]);
  })
}

doctorBtn.addEventListener("click", onDoctorSays);
patientBtn.addEventListener("click", onPatientSays);


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
