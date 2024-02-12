document.addEventListener('DOMContentLoaded', function () {
  // Menu-related variables
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const overlay = document.getElementById('overlay');
  const closeButtonExtendedMenu = document.getElementById('closeButtonExtendedMenu');

  // Variables for cart-related elements
  const cartIcon = document.querySelector('.carticon');
  const cartNumber = document.getElementById('cartNumber');
  const addToCartButton = document.querySelector('.add-button');

  // Image-related variables
  const imgCarousel = document.querySelector('.img-carousel');
  const focusedImage = document.createElement('img');
  focusedImage.classList.add('focused-image');
  const smallImages = document.querySelectorAll('.small-images img');

  // Amount-related variables
  const amountElement = document.querySelector('.amount .value');
  const minusButton = document.getElementById('minus');
  const plusButton = document.getElementById('plus');

  let shouldHideOverlay = true;

// Function to clear and remove the extended menu close button
function clearCloseButtonExtendedMenu() {
  // Add any cleanup code or additional functionality here
  console.log('Closing extended menu');
}

// Event listener for the extended menu close button
closeButtonExtendedMenu.addEventListener('click', function () {
  extendedMenu.classList.remove('open');
  overlay.classList.remove('active');
  shouldHideOverlay = true; // Set to true when closing the menu

  // Clear and remove the extended menu close button
  clearCloseButtonExtendedMenu();
});


// Toggle menu and overlay functions
hamburgerMenu.addEventListener('click', function () {
  extendedMenu.classList.toggle('open');
  overlay.classList.toggle('active');
  shouldHideOverlay = false; // Set to false when opening the menu
});

// Add a resize event listener to handle window resizing
window.addEventListener('resize', function () {
  // Clear the previous timeout
  clearTimeout(resizeTimeout);

  // Close the extended menu immediately on window resize
  extendedMenu.classList.remove('open');
  overlay.classList.remove('active');

  // Clear focused-image-buttons
  clearFocusedImageButtons();

  // Clear and remove the focused close button
  clearCloseButtonFocused();

  // Add a timeout to handle resize events more efficiently
  resizeTimeout = setTimeout(function () {
      if (window.innerWidth > 770) {
          extendedMenu.classList.remove('open');
          overlay.classList.remove('active');
      }
  }, 200);
});

// Event listener for img-carousel click
imgCarousel.querySelector('img').addEventListener('click', function () {
  // Find the currently active small image
  const activeSmallImage = document.querySelector('.small-images img.active');

  // Check if there's an active small image
  if (activeSmallImage) {
      // Get the data-img attribute of the active small image
      const focusedImageSrc = activeSmallImage.getAttribute('data-img');

      // Find the index of the focused image in the small images list
      const smallImages = document.querySelectorAll('.small-images img');
      for (let i = 0; i < smallImages.length; i++) {
          if (smallImages[i].getAttribute('data-img') === focusedImageSrc) {
              focusedImageIndex = i;
              break;
          }
      }

// Event listener for focused-small-images
function handleFocusedSmallImagesClick(event) {
  console.log('handleFocusedSmallImagesClick triggered');
  const focusedSmallImagesContainer = document.querySelector('.focused-small-images');

  if (focusedSmallImagesContainer && focusedSmallImagesContainer.contains(event.target)) {
      const clickedSmallImage = event.target.closest('.focused-small-image');

      if (clickedSmallImage) {
          const clickedSmallImageSrc = clickedSmallImage.getAttribute('data-img');
          focusedImage.src = clickedSmallImageSrc;

          // Handle styles for the clicked small image
          resetSmallImageStyles();
          clickedSmallImage.style.borderColor = 'hsl(26, 100%, 55%)';
          clickedSmallImage.style.opacity = '0.5';

          // Get the index of the clicked small image
          const clickedIndex = parseInt(clickedSmallImage.getAttribute('data-index'), 10);

          // Set the active state for focused-small-images
          setActiveStateForSmallImages(clickedIndex);

          // Log the clicked small image source for debugging
          console.log('Clicked Small Image Source:', clickedSmallImageSrc);
      }
  }
}

// Event listener for focused-small-images
function attachClickEventForSmallImages() {
  document.removeEventListener('click', handleFocusedSmallImagesClick);
  document.addEventListener('click', handleFocusedSmallImagesClick);
}

// Call this function whenever you need to attach the click event listener
attachClickEventForSmallImages();

// Call setInitialActiveState when the script is loaded
setInitialActiveState();

// Update the focusedImage source
focusedImage.src = focusedImageSrc;

// Append the focusedImage to the overlay
overlay.appendChild(focusedImage);

// Show the overlay
overlay.classList.add('active');

// Create focused-small-images container
const focusedSmallImagesContainer = document.createElement('div');
focusedSmallImagesContainer.classList.add('focused-small-images');

// Loop through small images and create new img elements
smallImages.forEach((smallImage, index) => {
  createSmallImageElement(smallImage, index);
});

// Append the focused-small-images container under the focused image
overlay.appendChild(focusedSmallImagesContainer);

// Call setInitialActiveState when the script is loaded
setInitialActiveState();

// Attach click event for small images
attachClickEventForSmallImages();


// Function to create new small image element
function createSmallImageElement(smallImage, index) {
  const smallImageDataSrc = smallImage.getAttribute('data-img');

  // Create new img element
  const newSmallImage = document.createElement('img');
  newSmallImage.src = smallImageDataSrc;
  newSmallImage.setAttribute('data-img', smallImageDataSrc);
  newSmallImage.classList.add('focused-small-image');

  // Set initially active state based on the initially active small image
  if (index === focusedImageIndex) {
      newSmallImage.classList.add('active');
      // Add visual elements for the initially active focused small image
      newSmallImage.style.borderColor = 'hsl(26, 100%, 55%)';
      newSmallImage.style.opacity = '0.5';
  }

  // Append the new small image to the focused-small-images container
  focusedSmallImagesContainer.appendChild(newSmallImage);
}

// Function to reset styles for all small images
function resetSmallImageStyles() {
  const smallImages = focusedSmallImagesContainer.querySelectorAll('.focused-small-image');
  smallImages.forEach(smallImage => {
      smallImage.style.borderColor = 'transparent';
      smallImage.style.opacity = '1'; // Reset opacity for other small images
  });
}


      // Create focused close button (X)
      const closeButtonFocused = document.createElement('button');
      closeButtonFocused.classList.add('focused-close-button'); // Updated class name
      closeButtonFocused.innerHTML = '&times;'; // Use a Unicode character or any other content

      // Calculate the left position for the focused close button dynamically
      const closeButtonLeftPosition = focusedImage.getBoundingClientRect().left + focusedImage.offsetWidth - closeButtonFocused.offsetWidth - 35; // Adjust as needed
      closeButtonFocused.style.left = closeButtonLeftPosition + 'px';

      // Calculate the top position for the focused close button dynamically
      const closeButtonTopPosition = focusedImage.getBoundingClientRect().top + -70; // Adjust as needed
      closeButtonFocused.style.top = closeButtonTopPosition + 'px';

      // Event listener for focused close button click
      closeButtonFocused.addEventListener('click', function () {
          // Clear the focused-image-buttons
          clearFocusedImageButtons();

          // Close the overlay
          overlay.classList.remove('active');

          // Remove the focused close button
          closeButtonFocused.remove();
      });

      // Append the focused close button to the overlay
      overlay.appendChild(closeButtonFocused);

  
      // Create focused-image-buttons container
      const focusedImageButtonsContainer = document.createElement('div');
      focusedImageButtonsContainer.classList.add('focused-image-buttons');

      // Create left arrow button
      const leftArrowButton = document.createElement('button');
      leftArrowButton.classList.add('arrow-button', 'left-arrow');
      leftArrowButton.onclick = () => changeImage(-1);

      // Create left arrow image
      const leftArrowImage = document.createElement('img');
      leftArrowImage.src = 'images/icon-previous.svg';
      leftArrowImage.alt = 'Left Arrow';

      // Append left arrow image to left arrow button
      leftArrowButton.appendChild(leftArrowImage);

      // Create right arrow button
      const rightArrowButton = document.createElement('button');
      rightArrowButton.classList.add('arrow-button', 'right-arrow');
      rightArrowButton.onclick = () => changeImage(1);

      // Create right arrow image
      const rightArrowImage = document.createElement('img');
      rightArrowImage.src = 'images/icon-next.svg';
      rightArrowImage.alt = 'Right Arrow';

      // Append right arrow image to right arrow button
      rightArrowButton.appendChild(rightArrowImage);

      // Define an adjustment factor for the left position
      const adjustmentFactor = -0.04; // Adjust this value as needed

      // Calculate the left position for the buttons dynamically
      const buttonsLeftPosition = focusedImage.getBoundingClientRect().left + (focusedImage.getBoundingClientRect().width * adjustmentFactor);

      // Set the left position for the buttons
      focusedImageButtonsContainer.style.left = buttonsLeftPosition + 'px';

      // Append left arrow button to focused-image-buttons container
      focusedImageButtonsContainer.appendChild(leftArrowButton);

      // Append right arrow button to focused-image-buttons container
      focusedImageButtonsContainer.appendChild(rightArrowButton);

      // Append the focused-image-buttons container under the focused image
      overlay.appendChild(focusedImageButtonsContainer);
  }
});

// Define the current index of the focused image
let focusedImageIndex = 0;

// Function to change the focused image
function changeImage(direction) {
  const focusedSmallImagesContainer = document.querySelector('.focused-small-images');

  if (!focusedSmallImagesContainer) {
      return; // Exit if the container is not found
  }

  // Get all small images inside the focused container
  const smallImages = focusedSmallImagesContainer.querySelectorAll('img.focused-small-image');

  // Update the focusedImageIndex based on the direction
  focusedImageIndex = (focusedImageIndex + direction + smallImages.length) % smallImages.length;

  // Get the data-img attribute of the new focused image
  const focusedImageSrc = smallImages[focusedImageIndex].getAttribute('data-img');

  // Update the focusedImage source
  focusedImage.src = focusedImageSrc;

  // Update the border color and opacity for focused small images
  smallImages.forEach((smallImage, index) => {
      smallImage.style.borderColor = index === focusedImageIndex ? 'hsl(26, 100%, 55%)' : 'transparent';
      smallImage.style.opacity = index === focusedImageIndex ? '0.5' : '1';
  });
}

// Event listener for left arrow button
const leftArrowButton = document.querySelector('.left-arrow');
if (leftArrowButton) {
  leftArrowButton.addEventListener('click', () => changeImage(-1));
}

// Event listener for right arrow button
const rightArrowButton = document.querySelector('.right-arrow');
if (rightArrowButton) {
  rightArrowButton.addEventListener('click', () => changeImage(1));
}

// Function to clear and remove the focused close button
function clearCloseButtonFocused() {
  const closeButtonFocused = document.querySelector('.focused-close-button');
  if (closeButtonFocused) {
      closeButtonFocused.remove();
  }
}

// Function to clear the focused-image-buttons
function clearFocusedImageButtons() {
  const focusedImageButtonsContainer = document.querySelector('.focused-image-buttons');
  if (focusedImageButtonsContainer) {
      focusedImageButtonsContainer.remove();
  }
}

// Variable to store the currently active small image
let currentlyActiveSmallImage = null;

// Function to set the initial active state for focused-small-images
function setInitialActiveState() {
  console.log('Setting initial active state for focused-small-images');

  const focusedSmallImagesContainer = document.querySelector('.focused-small-images');
  const focusedImage = document.querySelector('.focused-image img');

  if (focusedSmallImagesContainer && focusedImage) {
      const initialFocusedImageSrc = focusedImage.getAttribute('src');
      const initialFocusedSmallImage = focusedSmallImagesContainer.querySelector(`img[data-img="${initialFocusedImageSrc}"]`);

      if (initialFocusedSmallImage) {
          initialFocusedSmallImage.classList.add('active');
      }
  }
}

// Function to set the active state for focused-small-images based on the focused image
function setActiveStateForSmallImages(index) {
  console.log('Setting active state for focused-small-images');

  const focusedSmallImagesContainer = document.querySelector('.focused-small-images');

  if (focusedSmallImagesContainer) {
      // Remove 'active' class from all small images
      focusedSmallImagesContainer.querySelectorAll('img.focused-small-image').forEach(smallImage => {
          smallImage.classList.remove('active');
      });

      // Add 'active' class to the small image corresponding to the focused image
      const activeSmallImage = focusedSmallImagesContainer.querySelector(`img[data-index="${index}"]`);
      if (activeSmallImage) {
          activeSmallImage.classList.add('active');
      }
  }
}


// Event listener for small images
smallImages.forEach((img, index) => {
  img.addEventListener('click', function () {
      // Remove 'active' class from all images
      smallImages.forEach(otherImg => otherImg.classList.remove('active'));

      // Add 'active' class to the clicked image
      this.classList.add('active');

      // Update the main image based on the data-img attribute
      const mainImage = document.querySelector('.img-carousel img');
      const mainImagePath = this.getAttribute('data-img');
      mainImage.setAttribute('src', mainImagePath);

      // Update the currently active small image variable
      currentlyActiveSmallImage = this;

      // Set the active state for focused-small-images
      setActiveStateForSmallImages(index);
  });
});

      // Initial amount value
      let amount = 0;

      // Initial total items in the cart
      let totalItemsInCart = 0;
      
      // Event-related variables
      let resizeTimeout;
  
      // Function to update the amount element
      function updateAmount() {
          amountElement.textContent = amount;
      }

  // Function to update the cart number and icon
  function updateCartIcon() {
      cartNumber.textContent = totalItemsInCart;

      // Adjust the visibility using the display property
      cartNumber.style.display = totalItemsInCart > 0 ? 'block' : 'none';

      // Optionally, set other styling properties here
      if (totalItemsInCart > 0) {
          cartNumber.style.position = 'absolute';
          cartNumber.style.top = '-6px'; // Adjust this value as needed for proper positioning
          cartNumber.style.right = '6px'; // Adjust this value as needed for proper positioning
          cartNumber.style.zIndex = '2'; // Ensure the cart number is above the cart icon
      } else {
          cartNumber.style.position = 'static'; // Reset position to default
      }

      // Wrap the cart icon and cart number in a container
      const cartContainer = document.querySelector('.cart');
      cartContainer.style.position = 'relative';
      cartContainer.style.display = 'flex';
      cartContainer.style.alignItems = 'center';

      // Optionally, adjust the container styling as needed
  }

  // Event listener for the minus button
  minusButton.addEventListener('click', function () {
      if (amount > 0) {
          amount--;
          updateAmount();
      }
  });

  // Event listener for the plus button
  plusButton.addEventListener('click', function () {
      if (amount < 10) { // Limit to 10
          amount++;
          updateAmount();
      }
  });

  // Event listener for the add to cart button
  addToCartButton.addEventListener('click', function () {
      // Get the current value from the amount element
      const currentValue = parseInt(amountElement.textContent, 10);

      // Update the total items in the cart
      totalItemsInCart += currentValue;

      // Log statements for debugging
      console.log("Current Value:", currentValue);
      console.log("Total Items in Cart:", totalItemsInCart);

      // Update the cart icon
      updateCartIcon();
  });
});