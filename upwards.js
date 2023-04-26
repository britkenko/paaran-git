(function() {
  // Get the canvas element and its context
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Define the initial and final heights for the transition
  const initialHeight = canvas.height;
  const finalHeight = Math.floor(canvas.height * 0.1);

  // Define the duration of the transition in milliseconds
  const duration = 1400;

  // Define the final width of the canvas
  const finalWidth = Math.floor(canvas.width * 0.24);

  // Define the time interval between each frame of the animation in milliseconds
  const interval = 10;

  // Define the amount to increment the height and width of the canvas on each frame
  const incrementHeight = (initialHeight - finalHeight) / (duration / interval);
  const incrementWidth = (canvas.width - finalWidth) / (duration / interval);

  // Set the initial height and width of the canvas
  canvas.style.height = `${initialHeight}px`;
  canvas.style.width = `${canvas.width}px`;

  // Define a function to animate the transition
  function animate() {
    const currentHeight = parseInt(canvas.style.height);
    const currentWidth = parseInt(canvas.style.width);

    // Check if the current height has reached the final height
    if (currentHeight <= finalHeight || currentWidth <= finalWidth) {
      return;
    }

    // Calculate the new height and width for this frame of the animation
    const newHeight = currentHeight - incrementHeight;
    const newWidth = currentWidth - incrementWidth;

    // Set the new height and width for the canvas
    canvas.style.height = `${newHeight}px`;
    canvas.style.width = `${newWidth}px`;

    // Schedule the next frame of the animation
    requestAnimationFrame(animate);
  }

  // Define a function to start the animation on click
  function startAnimation() {
    animate();
    // Remove the event listener once the animation has started
    window.removeEventListener('click', startAnimation);
  }

  // Add a click event listener to start the animation
  window.addEventListener('click', startAnimation);

  // Wait for the specified delay before starting the animation automatically
  setTimeout(startAnimation, 7000);
    
    

})();
