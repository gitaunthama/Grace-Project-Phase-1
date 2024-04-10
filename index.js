// Wait till the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get all the elements we'll need
    const searchForm = document.getElementById('searchform');
    const searchInput = document.getElementById('search');
    const searchResultsContainer = document.getElementById('search-results');
    const errorContainer = document.getElementById('error_message');
    
    // Listen for form submissions
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submit action

        // Get the user's search query
        const searchQuery = searchInput.value.trim().toLowerCase();

        // Ensure previous search results and error messages are cleared
        searchResultsContainer.innerHTML = '';
        errorContainer.innerHTML = '';

        // Fetch data from the API based on searchQuery
        fetch(`http://localhost:3000/hotels?name_like=${searchQuery}`)
            .then(response => response.json()) // Convert API response into JSON
            .then(data1 => {
                // Check if the search returned results
                if (data1.length === 0) {
                    // Inform user if no results found
                    document.getElementById('search-results').textContent = 'No results found'
                } else {
                    // If results found, create elements and add to DOM
                    data1.forEach(room => {
                        // Create each element and set its text content
                        const roomDetails = document.createElement('div');
                        roomDetails.classList.add('room-details'); // Add necessary classes

                        const name = document.createElement('h2');
                        name.textContent = `Room Name: ${room.name}`; // Set text content to match result data
                        roomDetails.appendChild(name); // Add to parent container

                        const type = document.createElement('p');
                        type.textContent = `Room Type: ${room.type}`;
                        roomDetails.appendChild(type);

                        const price = document.createElement('p');
                        price.textContent = `Price: ${room.price}`;
                        roomDetails.appendChild(price);

                        // Iterate through each photo
                        room.photos.forEach(photo => {
                            const img = document.createElement('img');
                            img.src = photo.url; // Set image source URL
                            img.alt = photo.alt; // Set alt text for accessibility
                            roomDetails.appendChild(img);
                        });

                        // Append the room details to the results container
                        searchResultsContainer.appendChild(roomDetails);
                    });
                }
            })
            // Catch and handle errors
            .catch(error => {
                errorContainer.innerHTML = 'Error: ' + error;
                console.error('Error fetching data:', error);
            });
    });

    // Function to fetch data from the API based on chosen payment method
    function fetchData(paymentMethod) {
        fetch(`http://localhost:3000/payment-method?method=${encodeURIComponent(paymentMethod)}`)
            .then(response => {
                if (!response.ok) {
                    // Throw error if response didn't come through okay
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                console.log(`You've Selected ${paymentMethod} }`);
                alert(`You've selected ${paymentMethod}`);
            })
            .catch(error => {
                // Log any errors
                console.error('Error fetching data:', error);
            });
    }

    // Add click event listener to each payment method button
    document.querySelectorAll('.payment-method-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const paymentMethod = this.dataset.paymentmethod;
            fetchData(paymentMethod);
        });
    });

    // Function to toggle photo visibility
    function togglePhotoVisibility(photoLink, photoContainer) {
        let isPhotoVisible = false;

        photoLink.addEventListener('click', function (event) {
            event.preventDefault();

            // Toggle visibility on click
            if (isPhotoVisible) {
                photoContainer.style.display = 'none';
                isPhotoVisible = false;
            } else {
                const photoUrl = this.href;
                const photo = document.createElement('img');
                photo.src = photoUrl;

                photoContainer.innerHTML = '';
                photoContainer.appendChild(photo);

                photoContainer.style.display = 'block';
                isPhotoVisible = true;
            }
        });
    }

    // Get photo containers and links for each category and apply toggle function
    ['drinks', 'adventures', 'transport', 'games'].forEach(category => {
        const link = document.getElementById(`photo-link-${category}`);
        const container = document.getElementById(`photo-container-${category}`);
        togglePhotoVisibility(link, container);
    });
});