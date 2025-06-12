// Initialize global variables for the categories and cart
let groceryItems = document.querySelectorAll('.grocery-item');

// Load cart items from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  // Handle category navigation
  document.querySelectorAll('nav a').forEach(category => {
    category.addEventListener('click', (e) => {
      e.preventDefault();
      let categoryText = e.target.textContent.toLowerCase().trim();
      filterByCategory(categoryText === 'home' ? 'all' : categoryText);
    });
  });

  // Handle search bar input
  let searchBar = document.querySelector('.search-bar input');
  if (searchBar) {
    searchBar.addEventListener('input', handleSearch);
  }

  // Load the cart from localStorage and update the cart count
  updateCartCount();
});

// Function to filter products based on category
function filterByCategory(category) {
  groceryItems.forEach(item => {
    let itemCategory = item.dataset.category.toLowerCase();
    item.style.display = (category === 'all' || itemCategory === category) ? 'block' : 'none';
  });
}

// Function to handle the search functionality
function handleSearch(event) {
  let searchText = event.target.value.toLowerCase();
  groceryItems.forEach(item => {
    let itemName = item.dataset.name.toLowerCase();
    item.style.display = itemName.includes(searchText) ? 'block' : 'none';
  });
}

// Function to handle the View button click (product details)
function showInfo(button) {
  let item = button.closest('.grocery-item');
  if (!item) return;

  let itemDetails = {
    itemName: item.dataset.name,
    itemCategory: item.dataset.category,
    itemBenefits: item.dataset.benefits,
    itemCost: item.dataset.cost,
    itemDelivery: item.dataset.delivery,
    itemImage: item.querySelector('img')?.src || ''
  };

  Object.entries(itemDetails).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  window.location.href = 'product.html';
}

// Function to handle adding an item to the cart and show a notification
function addToCart(itemName) {
  // Get the current cart from localStorage, or create an empty array if not present
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the item to the cart array
  cart.push(itemName);

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart count in the header
  updateCartCount();

  // Show the notification that the item was added
  showAddedToCartNotification(itemName);
}

// Function to update the cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;  // Display the length of the cart
}

// Function to show a notification when an item is added to the cart
function showAddedToCartNotification(itemName) {
  const notificationMessage = `${itemName} has been added to your cart!`;

  // Create notification element
  const notificationElement = document.createElement('div');
  notificationElement.classList.add('notification');
  notificationElement.innerText = notificationMessage;

  // Append the notification to the body
  document.body.appendChild(notificationElement);

  // Show notification with animation
  setTimeout(() => {
    notificationElement.classList.add('show');
  }, 10);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notificationElement.classList.remove('show');
    // Remove notification element after animation
    setTimeout(() => {
      notificationElement.remove();
    }, 300);
  }, 3000);
}

// Function to close the modal (if present)
function closeModal() {
  document.getElementById('info-modal')?.classList.add('hidden');
}

// Handle Sign In toggle
const signinLink = document.getElementById('signin-link');
const accountSection = document.getElementById('account-section');
const accountForm = document.getElementById('account-form');

if (signinLink && accountSection) {
  signinLink.addEventListener('click', (event) => {
    event.preventDefault();
    accountSection.classList.toggle('hidden');
  });
}

function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}

// Handle form submission
if (accountForm) {
  accountForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userDetails = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      dob: document.getElementById('dob').value,
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value
    };

    console.log('Account Created:', userDetails);
    accountForm.reset();
    accountSection.classList.add('hidden');
  });
}

// Event listener for logout button
document.getElementById('logout-btn').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent the default anchor tag behavior
  
  // Clear user data from localStorage (or sessionStorage if you are using it)
  localStorage.clear();  // Clears all stored data
  
  // Redirect to the login page
  window.location.href = 'login.html';  // Replace with your login page URL
});
