// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the search input and results list
    var searchInput = document.getElementById('searchInput');
    var resultsCards = document.getElementById('resultsCards');

    // Add an event listener to the input for the 'input' event
    searchInput.addEventListener('input', function () {

        // Clear previous results
        resultsCards.innerHTML = '';

        // Get the search term from the input
        var searchTerm = this.value.toLowerCase();

        // If search term is deleted and empty, remove the inner HTML then return
        if (searchTerm === '') {
            resultsCards.innerHTML = '';
            return; // Exit the function without fetching or filtering
        }

        // Fetch the JSON file and handle the response
        fetch('data/fighters.json')
            .then(response => response.json())
            .then(function (data) {
                // Filter data based on the search term
                var matchingItems = data.filter(function (item) {
                    return item.name.toLowerCase().includes(searchTerm);
                });

                // Display matching items
                matchingItems.forEach(function (item) {
                    // Create a new list item for each matching result
                    const listCard = document.createElement('div')

                    const newLink = document.createElement('a')
                    newLink.textContent = item.name
                    newLink.setAttribute("href", "details.html?id=" + item.id);

                    const newP = document.createElement('p')
                    newP.textContent = item.location

                    listCard.appendChild(newLink)
                    listCard.appendChild(newP)


                    var listItem = document.createElement('li');
                    listItem.textContent = item.name;

                    // Append the list item to the results list
                    resultsCards.appendChild(listCard);
                });
            })
            .catch(function (error) {
                // Handle errors during the fetch operation
                console.error('Error fetching JSON: ', error);
            });
    });
});