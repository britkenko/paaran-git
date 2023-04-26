const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomBlueColor() {
  const hue = Math.floor(Math.random() * 60) + 190; // Adding 200 to keep the hue value within the blue range
  return `hsl(${hue}, 100%, 50%)`;
}

function drawLines() {
  const duration = 3; // Duration of line drawing in seconds
  const interval = 5; // Decrease the interval for smoother animation (previous value was 25)
  let currentStep = 0;
  const totalSteps = Math.floor((duration * 1000) / interval);
  const lineWidth = 1;
  const lineSpacing = 1; // Increase the lineSpacing to create gaps between lines
  const lineColor = getRandomBlueColor();

  function drawSingleLine() {
    if (currentStep >= totalSteps) {
      clearInterval(intervalId);
      return;
    }

    const progress = (currentStep / totalSteps) * canvas.width;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    let yPos = 0;
    while (yPos < canvas.height) {
      ctx.beginPath();
      if (yPos % (lineWidth * 4) === 0) {
        ctx.moveTo(progress, yPos);
        ctx.lineTo(0, yPos);
      } else {
        ctx.moveTo(canvas.width - progress, yPos);
        ctx.lineTo(canvas.width, yPos);
      }
      ctx.stroke();
      yPos += lineWidth + lineSpacing;
    }

    let xPos = 0;
    while (xPos < canvas.width) {
      ctx.beginPath();
      if (xPos % (lineWidth * 4) === 0) {
        ctx.moveTo(xPos, progress);
        ctx.lineTo(xPos, 0);
      } else {
        ctx.moveTo(xPos, canvas.height - progress);
        ctx.lineTo(xPos, canvas.height);
      }
      ctx.stroke();
      xPos += lineWidth + lineSpacing;
    }

    currentStep++;
  }

  const intervalId = setInterval(drawSingleLine, interval);
}

drawLines();
