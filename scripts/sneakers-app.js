document.addEventListener('DOMContentLoaded', function () {
    // Menu-related variables
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const extendedMenu = document.querySelector('.extended-menu');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('closeButton');

    // Amount-related variables
    const amountElement = document.querySelector('.amount .value');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');

    // Variables for cart-related elements
    const cartIcon = document.querySelector('.carticon');
    const cartNumber = document.getElementById('cartNumber');
    const addToCartButton = document.querySelector('.add-button');

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

    // Toggle menu and overlay functions (unchanged)
    hamburgerMenu.addEventListener('click', function () {
        extendedMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    closeButton.addEventListener('click', function () {
        extendedMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function () {
        extendedMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    window.addEventListener('resize', function () {
        // Close the extended menu immediately on window resize
        extendedMenu.classList.remove('open');
        overlay.classList.remove('active');
        
        // Add a timeout to handle resize events more efficiently
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            if (window.innerWidth > 770) {
                extendedMenu.classList.remove('open');
                overlay.classList.remove('active');
            }
        }, 200);
    });
});
