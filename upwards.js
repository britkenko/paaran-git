function animate() {
  const currentHeight = canvas.height;
  const currentWidth = canvas.width;

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
  canvas.style.top = `${rect.top - (initialHeight - newHeight) / 2}px`;
  canvas.style.left = `${rect.left - (initialWidth - newWidth) / 2}px`;

  requestAnimationFrame(animate);
}
