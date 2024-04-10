document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchform');
    const searchInput = document.getElementById('search');
    const searchResultsContainer = document.getElementById('search-results');
    const errorContainer = document.getElementById('error_message');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve search query entered by the user
        const searchQuery = searchInput.value.trim().toLowerCase();

        // Clear previous search results and error message
        searchResultsContainer.innerHTML = '';
        errorContainer.innerHTML = '';

        // Fetch data from the API
        fetch(`http://localhost:3000/hotels?name_like=${searchQuery}`)

            .then(response => response.json())
            .then(data1 => {
                if (data1.length === 0) {
                    document.getElementById('search-results').textContent = 'No results found'

                } else  {
                    // Display all data about the room
                    data1.forEach(room => {
                        const roomDetails = document.createElement('div');
                        roomDetails.classList.add('room-details');

                        const name = document.createElement('h2');
                        name.textContent = `Room Name: ${room.name}`;
                        roomDetails.appendChild(name);

                        const type = document.createElement('p');
                        type.textContent = `Room Type: ${room.type}`;
                        roomDetails.appendChild(type);

                        const price = document.createElement('p');
                        price.textContent = `Price: ${room.price}`;
                        roomDetails.appendChild(price);

                        // Display photos
                        room.photos.forEach(photo => {
                            const img = document.createElement('img');
                            img.src = photo.url;
                            img.alt = photo.alt;
                            roomDetails.appendChild(img);
                        });

                        searchResultsContainer.appendChild(roomDetails);
                    });
                }
            })
            .catch(error => {
                errorContainer.innerHTML = 'Error: ' + error;
                console.error('Error fetching data:', error);
            });
    });

    // Function to fetch data from the API based on the selected payment method
    function fetchData(paymentMethod) {
        fetch(`http://localhost:3000/payment-method?method=${paymentMethod}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                console.log(`You've Selected ${paymentMethod} }`);
                alert(`You've selected ${paymentMethod}`);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Event listener for each payment method button
    document.querySelectorAll('.payment-method-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const paymentMethod = this.dataset.paymentmethod;
            fetchData(paymentMethod);
        });
    });

    //  photo visibility
    function togglePhotoVisibility(photoLink, photoContainer) {
        let isPhotoVisible = false;

        photoLink.addEventListener('click', function (event) {
            event.preventDefault();

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

    //  photo visibility for drinks
    const drinksPhotoLink = document.getElementById('photo-link');
    const drinksPhotoContainer = document.getElementById('photo-container');
    togglePhotoVisibility(drinksPhotoLink, drinksPhotoContainer);

    //  photo visibility for adventures
    const adventuresPhotoLink = document.getElementById('photo-link1');
    const adventuresPhotoContainer = document.getElementById('photo-container1');
    togglePhotoVisibility(adventuresPhotoLink, adventuresPhotoContainer);

    //  photo visibility for transport
    const transportPhotoLink = document.getElementById('photo-link2');
    const transportPhotoContainer = document.getElementById('photo-container2');
    togglePhotoVisibility(transportPhotoLink, transportPhotoContainer);

    // photo visibility for games
    const gamesPhotoLink = document.getElementById('photo-link3');
    const gamesPhotoContainer = document.getElementById('photo-container3');
    togglePhotoVisibility(gamesPhotoLink, gamesPhotoContainer);
});