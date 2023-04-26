const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paaranArt = document.getElementById('paaran-art');
const paaranArtWidth = paaranArt.clientWidth;
const paaranArtHeight = paaranArt.clientHeight;

function getRandomBlueColor() {
  const hue = Math.floor(Math.random() * 60) + 190;
  return `hsl(${hue}, 100%, 50%)`;
}

function drawLines() {
  const duration = 3;
  const interval = 5;
  let currentStep = 0;
  const totalSteps = Math.floor((duration * 1000) / interval);
  const lineWidth = 1;
  const lineSpacing = 1;
  const lineColor = getRandomBlueColor();

  // Get the 'PAARAN ART' element's position
  const paaranArtRect = paaranArt.getBoundingClientRect();
  const paaranArtX = paaranArtRect.left;
  const paaranArtY = paaranArtRect.top;

  // Calculate the reserved area
  const reservedArea = {
    left: paaranArtX - 20,
    right: paaranArtX + paaranArtWidth + 20,
    top: paaranArtY - 20,
    bottom: paaranArtY + paaranArtHeight + 20,
  };

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

      // Determine if the yPos is within the reserved area
      const isWithinReservedArea = yPos >= reservedArea.top && yPos <= reservedArea.bottom;

      if (yPos % (lineWidth * 4) === 0) {
        if (!isWithinReservedArea) {
          ctx.moveTo(progress, yPos);
          ctx.lineTo(0, yPos);
        } else {
          ctx.moveTo(reservedArea.right, yPos);
          ctx.lineTo(progress, yPos);
        }
      } else {
        if (!isWithinReservedArea) {
          ctx.moveTo(canvas.width - progress, yPos);
          ctx.lineTo(canvas.width, yPos);
        } else {
          ctx.moveTo(0, yPos);
          ctx.lineTo(reservedArea.left, yPos);
        }
      }

      ctx.stroke();
      yPos += lineWidth + lineSpacing;
    }

    currentStep++;
  }

  const intervalId = setInterval(drawSingleLine, interval);
}

function animate() {
  const currentHeight = canvas.height;
  const currentWidth = canvas.width;

  const finalHeight = paaranArtHeight + 40;
  const finalWidth = paaranArtWidth + 40;
  const incrementHeight = 10; // Define incrementHeight
  const incrementWidth = 10; // Define incrementWidth

  if (currentHeight <= finalHeight || currentWidth <= finalWidth) {
    const rect = paaranArt.getBoundingClientRect();
    canvas.style.top = `${rect.top - 20}px`;
    canvas.style.left = `${rect.left - 20}px`;
    return;
  }

  const newHeight = currentHeight - incrementHeight;
  const newWidth = currentWidth - incrementWidth;

  canvas.height = newHeight;
  canvas.width = newWidth;

  drawLines(); // Redraw the lines after resizing the canvas

  const rect = paaranArt.getBoundingClientRect();
animate();
