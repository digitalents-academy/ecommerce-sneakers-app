document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        hamburgerMenu: document.querySelector('.hamburger-menu'),
        extendedMenu: document.querySelector('.extended-menu'),
        overlay: document.getElementById('overlay'),
        closeButtonExtendedMenu: document.getElementById('closeButtonExtendedMenu'),
        cartIcon: document.getElementById('cart'),
        cartNumber: document.getElementById('cartNumber'),
        addToCartButton: document.querySelector('.add-button'),
        imgCarousel: document.querySelector('.img-carousel img'),
        smallImages: document.querySelectorAll('.small-images img'),
        minusButton: document.getElementById('minus'),
        plusButton: document.getElementById('plus'),
        amountElement: document.querySelector('.amount .value'),
        focusedImageOverlay: document.getElementById('focusedImageOverlay'),
        focusedImageContainer: document.getElementById('focusedImageContainer'),
        focusedMainImage: document.getElementById('focusedMainImage'),
        focusedSmallImagesContainer: document.getElementById('focusedSmallImages'),
        closeFocusedViewButton: document.getElementById('closeFocusedView'),
        rotateLeftButton: document.getElementById('rotateLeftButton'),
        rotateRightButton: document.getElementById('rotateRightButton'),
        carouselRotateLeft: document.getElementById('carouselRotateLeft'),
        carouselRotateRight: document.getElementById('carouselRotateRight'),
        cartDropdown: document.querySelector('.cart-dropdown'),
    };

    let state = {
        amount: 0,
        totalItemsInCart: 0,
        focusedImageIndex: 0,
        cartItems: []
    };

    // Attempt to load cart items from localStorage
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        try {
            state.cartItems = JSON.parse(savedCartItems);
        } catch (e) {
            console.error('Failed to parse cart items from localStorage', e);
            // Optionally reset to empty if there's an error, depends on your error handling strategy
            state.cartItems = [];
        }
    }

    // Update cart number display
    updateCartNumberDisplay();
    

    function updateCartNumberDisplay() {
        // Calculate total items in cart and update display
        const totalItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        elements.cartNumber.textContent = totalItems;
        // Optionally, hide the cart number display if there are no items
        elements.cartNumber.style.display = totalItems > 0 ? 'block' : 'none';
    }

    function updateCart() {
        // Existing logic for adding items to the cart...
    
        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
        // Update the cart dropdown (if this is not already done within updateCartDropdown)
        updateCartDropdown();
    }
    
    let hideDropdownTimeout;
    
    function showCartDropdown() {
        clearTimeout(hideDropdownTimeout); // Cancel any pending hide action
        elements.cartDropdown.style.display = 'block'; // Show the dropdown
    }
    
    function hideCartDropdownWithDelay() {
        clearTimeout(hideDropdownTimeout); // Clear any existing timeout to prevent hiding too early
        hideDropdownTimeout = setTimeout(() => {
            elements.cartDropdown.style.display = 'none'; // Hide the dropdown after a delay
        }, 3000); // 3000ms = 3 seconds
    }

    function setupHideDropdownOnOutsideClick() {
        document.addEventListener('click', function(event) {
            // Check if the click is outside the cartDropdown and not on the cartIcon itself
            if (!elements.cartDropdown.contains(event.target) && !elements.cartIcon.contains(event.target)) {
                elements.cartDropdown.style.display = 'none';
                // Clear any hide delays, to prevent unexpected behavior
                clearTimeout(hideDropdownTimeout);
            }
        });
    }
    
    function updateAmount(direction) {
        console.log('Before update:', state.amount);
        state.amount = Math.max(0, state.amount + direction);
        console.log('After update:', state.amount);
        elements.amountElement.textContent = state.amount;
    }
    
    function updateCart() {
        // Check if the amount is 0 and exit the function if it is
        if (state.amount <= 0) {
            console.log('No items to add to cart.'); // Optional: for debugging
            return; // Exit the function early
        }
    
        // Continue with adding the item to the cart as before
        const newItem = {
            name: "Fall Limited Edition Sneakers",
            price: 125.00,
            quantity: state.amount, // Assuming state.amount is updated elsewhere and represents the quantity to add
            thumbnail: "images/image-product-1-thumbnail.jpg"
        };
    
        const existingItemIndex = state.cartItems.findIndex(item => item.name === newItem.name);
        if (existingItemIndex !== -1) {
            // Item exists, update its quantity, but ensure it does not exceed 10
            state.cartItems[existingItemIndex].quantity = Math.min(10, state.cartItems[existingItemIndex].quantity + newItem.quantity);
        } else {
            // Item does not exist, add to cart, but ensure total items in cart do not exceed 10
            if (state.cartItems.length < 10) {
                state.cartItems.push(newItem);
            } else {
                console.log('Cart is full.'); // Optional: for debugging
                return; // Exit the function early
            }
        }
    
        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
        // Update cart number display and refresh the dropdown as before
        elements.cartNumber.textContent = state.cartItems.reduce((total, item) => total + item.quantity, 0);
        elements.cartNumber.style.display = state.cartItems.length > 0 ? 'block' : 'none';

        updateCartDropdown();
    }

    function updateCartDropdown() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Clear current items
    
        // Update the grand total price display and reset if cart is empty
        let grandTotalPrice = 0; // Initialize grand total price
    
        if (Array.isArray(state.cartItems) && state.cartItems.length > 0) {
            state.cartItems.forEach((item, index) => {
                const itemTotalPrice = item.price * item.quantity;
                grandTotalPrice += itemTotalPrice; // Accumulate grand total price
    
                const itemElement = document.createElement('li');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.thumbnail}" alt="Product" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="title">${item.name}</div>
                        <div class="price">$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotalPrice.toFixed(2)}</div>
                    </div>
                    <button class="remove-item" aria-label="Remove">
                        <img src="images/icon-delete.svg" alt="Delete">
                    </button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        } else {
            cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
        }
    
        document.getElementById('cartTotalPrice').textContent = `$${grandTotalPrice.toFixed(2)}`;
    }
    
    // Call updateCartDropdown to initialize the cart's UI
    updateCartDropdown();

    
    // Setup event listener for dynamic cart items removal outside of updateCartDropdown
    setupCartItemsEventListener();

    // Function to attach event listeners to static elements
    function attachEventListeners() {
        // elements and event listeners setup as before
        // Example:
        elements.addToCartButton.addEventListener('click', updateCart);
        // Add other static event listeners here
    }

// Function to setup event listener for dynamic cart items removal
function setupCartItemsEventListener() {
    document.querySelector('.cart-items').addEventListener('click', function(event) {
        if (event.target.closest('.remove-item')) {
            // Clear the entire cartItems array
            state.cartItems = []; // Resets the cart

            // Update localStorage to reflect the cleared cart
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            // Update UI to reflect the empty cart
            updateCartDropdown();
            updateCartNumberDisplay(); // Also update the cart number display

            // No need to call updateCart here directly if updateCartDropdown and updateCartNumberDisplay handle UI updates
        }
    });
}
        
    function rotateCarousel(direction) {
        const totalImages = elements.smallImages.length;
        let activeIndex = findActiveImageIndex();
    
        // Calculate the index of the next image based on the direction
        let newIndex = (activeIndex + direction + totalImages) % totalImages;
    
        // Get the data-img attribute of the next image
        let nextImageUrl = elements.smallImages[newIndex].getAttribute('data-img');
    
        // Set the main carousel image source to the next image URL
        elements.imgCarousel.src = nextImageUrl;
    
        // Optionally, update the active class on the small images (if needed)
        // This part depends on your specific requirements
        elements.smallImages.forEach(img => img.classList.remove('active'));
        elements.smallImages[newIndex].classList.add('active');
    }

    function positionCarouselRotateButtons() {
        const carouselContainer = document.querySelector('.img-carousel');
        const carouselHeight = carouselContainer.offsetHeight;
        const rotateButtons = document.querySelectorAll('#carouselRotateLeft, #carouselRotateRight');

        rotateButtons.forEach(button => {
            button.style.top = `${(carouselHeight / 2) - (button.offsetHeight / 2) + 80}px`;
        });
    }

    // Call the positioning function initially and on window resize
    positionCarouselRotateButtons();
    window.addEventListener('resize', positionCarouselRotateButtons);
    function setActiveImage(index) {
        elements.smallImages.forEach((img, imgIndex) => {
            const isActive = index === imgIndex;
            img.classList.toggle('active', isActive);
            if (isActive) {
                elements.imgCarousel.src = img.dataset.img;
                if (elements.focusedImageContainer.style.display === 'block') {
                    openFocusedImageView(index);
                }
            }
        });
    }

    function updateButtonPositions() {
        if (!elements.focusedMainImage.complete) {
            elements.focusedMainImage.onload = updateButtonPositions;
            return;
        }

        const { left: containerLeft, right: containerRight } = elements.focusedImageContainer.getBoundingClientRect();
        const { left: imageLeft, right: imageRight } = elements.focusedMainImage.getBoundingClientRect();

        elements.rotateLeftButton.style.left = `${imageLeft - containerLeft - 20}px`;
        elements.rotateRightButton.style.right = `${containerRight - imageRight - 20}px`;
    }

    function openFocusedImageView(index = null) {
        if (window.innerWidth < 771) return;
    
        // Use the provided index, or find the active image index, or default to 0 if none is active
        const targetIndex = index !== null ? index : findActiveImageIndex();
        if (targetIndex === -1 || elements.smallImages.length === 0) {
            console.error('No active or available image to display in focused view.');
            return; // Exit the function if no valid image is found
        }
        const targetImg = elements.smallImages[targetIndex];
        state.focusedImageIndex = targetIndex;
        
        elements.focusedImageOverlay.style.display = 'block';
        elements.focusedImageContainer.style.display = 'block';
        elements.focusedMainImage.src = targetImg.dataset.img; // Error was here
        updateButtonPositions();
        updateThumbnailsForFocusedView();
    }
    
    // Adjusted helper function to safely handle cases where no image is active
    function findActiveImageIndex() {
        const activeIndex = Array.from(elements.smallImages).findIndex(img => img.classList.contains('active'));
        return activeIndex !== -1 ? activeIndex : 0; // Default to the first image if none is active
    }
    
    // Ensure the initial active image setup is correct
    function setInitialActiveImage() {
        if (findActiveImageIndex() === -1 && elements.smallImages.length > 0) {
            elements.smallImages[0].classList.add('active'); // Mark the first image as active if none are
        }
    }
    
    // Call this function at the start to ensure there's always an active image
    setInitialActiveImage();

    function updateThumbnailsForFocusedView() {
        elements.focusedSmallImagesContainer.innerHTML = '';
        elements.smallImages.forEach((img, idx) => {
            const thumbnail = img.cloneNode(true);
            thumbnail.classList.toggle('active', idx === state.focusedImageIndex);
            thumbnail.addEventListener('click', () => openFocusedImageView(idx));
            elements.focusedSmallImagesContainer.appendChild(thumbnail);
        });
    }

    function closeFocusedImageView() {
        elements.focusedImageOverlay.style.display = 'none';
        elements.focusedImageContainer.style.display = 'none';
    }

    function rotateImage(direction) {
        const totalImages = elements.smallImages.length;
        state.focusedImageIndex = (state.focusedImageIndex + direction + totalImages) % totalImages;
        openFocusedImageView(state.focusedImageIndex);
    }

    // Define toggleOverlayAndMenu here
    function toggleOverlayAndMenu() {
        if (elements.overlay && elements.extendedMenu) {
            elements.overlay.classList.toggle('active');
            elements.extendedMenu.classList.toggle('open');
        } else {
            console.error('Overlay or extended menu elements are not found.');
        }
    }

    function attachEventListeners() {
        elements.hamburgerMenu.addEventListener('click', toggleOverlayAndMenu);
        elements.closeButtonExtendedMenu.addEventListener('click', toggleOverlayAndMenu);
        elements.minusButton.addEventListener('click', () => updateAmount(-1));
        elements.plusButton.addEventListener('click', () => updateAmount(1));
        if (elements.cartIcon) {
            elements.cartIcon.addEventListener('mouseenter', showCartDropdown);
            elements.cartIcon.addEventListener('mouseleave', hideCartDropdownWithDelay);
        }
        if (elements.cartDropdown) {
            elements.cartDropdown.addEventListener('mouseenter', showCartDropdown);
            elements.cartDropdown.addEventListener('mouseleave', hideCartDropdownWithDelay);
        }
        elements.addToCartButton.addEventListener('click', updateCart);
        elements.smallImages.forEach((img, index) => img.addEventListener('click', () => setActiveImage(index)));
        elements.imgCarousel.addEventListener('click', () => openFocusedImageView(findActiveImageIndex()));
        elements.closeFocusedViewButton.addEventListener('click', closeFocusedImageView);
        elements.rotateLeftButton.addEventListener('click', () => rotateImage(-1));
        elements.rotateRightButton.addEventListener('click', () => rotateImage(1));
        if (elements.carouselRotateLeft) {
            elements.carouselRotateLeft.addEventListener('click', () => rotateCarousel(-1));
        }
        if (elements.carouselRotateRight) {
            elements.carouselRotateRight.addEventListener('click', () => rotateCarousel(1));
        }
        window.addEventListener('resize', debounce(updateButtonPositions, 250));
}

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    setupHideDropdownOnOutsideClick();
    updateCartDropdown();
    attachEventListeners();
});