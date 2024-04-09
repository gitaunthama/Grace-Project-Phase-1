document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchform');
    const searchInput = document.getElementById('search');
    const searchResultsContainer = document.getElementById('search-results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve search query entered by the user
        const searchQuery = searchInput.value.trim().toLowerCase();

        // Fetch data from the API
        fetch(`http://localhost:3000/hotels?name_like=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous search results
                searchResultsContainer.innerHTML = '';

                if (data.length === 0) {
                    // If no matching results found
                    searchResultsContainer.innerHTML = '<p>No matching results found.</p>';
                } else {
                    // Display all data about the room
                    data.forEach(room => {
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

                        // Add more details about the room as needed

                        searchResultsContainer.appendChild(roomDetails);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
// PAYMENT OPTIONS
// JavaScript





// THE CARDS PART

// <.......................................................................................................................................................................>
// Drinks Menu

document.addEventListener('DOMContentLoaded', function() {
    const photoLink = document.getElementById('photo-link');
    const photoContainer = document.getElementById('photo-container');

    let isPhotoVisible = false; // Variable to track the visibility state of the photo container

    photoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        if (isPhotoVisible) {
            // If the photo container is visible, hide it
            photoContainer.style.display = 'none';
            isPhotoVisible = false; // Update the visibility state
        } else {
            // If the photo container is hidden, display it
            const photoUrl = this.href; // Get the URL from the link's href attribute

            // Create an image element
            const photo = document.createElement('img');
            photo.src = photoUrl; // Set the source of the image to the URL

            // Clear existing content in the photo container
            photoContainer.innerHTML = '';

            // Append the image to the photo container
            photoContainer.appendChild(photo);

            // Show the photo container
            photoContainer.style.display = 'block';
            isPhotoVisible = true; // Update the visibility state
        }
    });
});

// Adventure list
document.addEventListener('DOMContentLoaded', function() {
    
    const photoLink1 = document.getElementById('photo-link1');
    const photoContainer1 = document.getElementById('photo-container1');
    let isPhoto1Visible = false; // Variable to track the visibility state of the first photo container

    photoLink1.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        if (isPhoto1Visible) {
            // If the first photo container is visible, hide it
            photoContainer1.style.display = 'none';
            isPhoto1Visible = false; // Update the visibility state
        } else {
            // If the first photo container is hidden, display it
            const photoUrl = this.href; // Get the URL from the link's href attribute

            // Create an image element
            const photo = document.createElement('img');
            photo.src = photoUrl; // Set the source of the image to the URL

            // Clear existing content in the first photo container
            photoContainer1.innerHTML = '';

            // Append the image to the first photo container
            photoContainer1.appendChild(photo);

            // Show the first photo container
            photoContainer1.style.display = 'block';
            isPhoto1Visible = true; // Update the visibility state
        }
    });

    // Transport container
    const photoLink2 = document.getElementById('photo-link2');
    const photoContainer2 = document.getElementById('photo-container2');
    let isPhoto2Visible = false; // Variable to track the visibility state of the second photo container

    photoLink2.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        if (isPhoto2Visible) {
            // If the second photo container is visible, hide it
            photoContainer2.style.display = 'none';
            isPhoto2Visible = false; // Update the visibility state
        } else {
            // If the second photo container is hidden, display it
            const photoUrl = this.href; // Get the URL from the link's href attribute

            // Create an image element
            const photo = document.createElement('img');
            photo.src = photoUrl; // Set the source of the image to the URL

            // Clear existing content in the second photo container
            photoContainer2.innerHTML = '';

            // Append the image to the second photo container
            photoContainer2.appendChild(photo);

            // Show the second photo container
            photoContainer2.style.display = 'block';
            isPhoto2Visible = true; // Update the visibility state
        }
    });
    // Games Container
    const photoLink3 = document.getElementById('photo-link3');
    const photoContainer3 = document.getElementById('photo-container3');

    // Track whether the photo is currently visible or not
    let isPhotoVisible = false;

    photoLink3.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Toggle the visibility of the photo container
        if (isPhotoVisible) {
            photoContainer3.innerHTML = ''; // Clear the photo container
            isPhotoVisible = false;
        } else {
            const photoUrl = this.href; // Get the URL from the link's href attribute

            // Create an image element
            const photo = document.createElement('img');
            photo.src = photoUrl; // Set the source of the image to the URL

            // Append the image to the photo container
            photoContainer3.innerHTML = ''; // Clear the photo container before appending
            photoContainer3.appendChild(photo);

            isPhotoVisible = true;
        }
    });
});

 // Function to fetch data from the API based on the selected payment method
 function fetchData(paymentMethod) {
    fetch(`http://localhost:3000/payment-method ${paymentMethod}`) // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Add event listeners to each payment method button
document.querySelectorAll('.payment-method-button').forEach(button => {
    button.addEventListener('click', function() {
        const paymentMethod = this.dataset.paymentMethod;
        fetchData(paymentMethod);
    });
});