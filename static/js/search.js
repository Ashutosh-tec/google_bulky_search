let websiteCategories = {};
// Fetch website categories from JSON file
fetch('static\\data\\website_categories.json')
    .then(response => response.json())
    .then(data => {
        websiteCategories = data;
    })
    .catch(error => console.error('Error loading website categories:', error));

function handleSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    if (!searchQuery) {
        searchInput.classList.add('is-invalid');
        return false;
    }

    // Get selected categories
    const selectedCategories = [];
    document.querySelectorAll('.category-checkbox:checked').forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });

    if (selectedCategories.length === 0) {
        alert('Please select at least one category');
        return false;
    }

    // Open a new tab for each website in selected categories with delay
    async function openSearchTabs() {
        for (const category of selectedCategories) {
            for (const website of websiteCategories[category]) {
                const enhancedQuery = encodeURIComponent(`${searchQuery} ${website}`);
                window.open(`https://www.google.com/search?q=${enhancedQuery}`, '_blank');
                await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between tabs
            }
        }
    }

    openSearchTabs();
    return false;
}