document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');
    const errorMessage = document.getElementById('errorMessage');

    // Function to validate search input
    const validateSearchInput = (input) => {
        if (!input || input.trim() === '') {
            throw new Error('Please enter a search term');
        }
        if (input.length < 2) {
            throw new Error('Search term must be at least 2 characters long');
        }
        if (!/^[a-zA-Z0-9\s-]+$/.test(input)) {
            throw new Error('Search term can only contain letters, numbers, spaces, and hyphens');
        }
        return input.trim();
    };

    // Function to display error message
    const showError = (message) => {
        errorMessage.textContent = message;
        resultsContainer.innerHTML = '';
    };

    // Function to clear error message
    const clearError = () => {
        errorMessage.textContent = '';
    };

    // Function to create product card
    const createProductCard = (product) => {
        return `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <p>Rating: ${product.rating}/5</p>
            </div>
        `;
    };

    // Function to search products
    const searchProducts = async (searchTerm) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            
            if (data.products.length === 0) {
                showError('No products found matching your search');
                return;
            }

            clearError();
            resultsContainer.innerHTML = data.products.map(createProductCard).join('');
        } catch (error) {
            showError(error.message);
        }
    };

    // Event listener for form submission
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const searchTerm = validateSearchInput(searchInput.value);
            await searchProducts(searchTerm);
        } catch (error) {
            showError(error.message);
        }
    });

    // Event listener for input changes to clear error message
    searchInput.addEventListener('input', clearError);
}); 