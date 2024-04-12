// Wait till the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    let hotels = [
        { name: 'Palm Before Pine', price: 200, type: 'Suite', availability: 'true', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg' },
        { name: 'Oceanside Escape', price: 150, type: 'Single-room', availability: 'true', photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/217323310.jpg?k=7a33f08f7f0b0af0dc5475052e96cef52a6266142a57fb4324137840a27f06f2&o=&s=1024x'},
        { name: 'Sunnyside Up', price: 250, type: 'Suite', availability: 'false', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg'},
        { name: 'Elite Palace', price: 100, type: 'Double-room', availability: 'true', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg'},
        { name: 'Sarova-w', price: 200, type: 'Suite', availability: 'true', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg'},
        { name: 'Cape place', price: 150, type: 'Single-room', availability: 'true', photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/217323310.jpg?k=7a33f08f7f0b0af0dc5475052e96cef52a6266142a57fb4324137840a27f06f2&o=&s=1024x'},
        { name: 'Loung Place', price: 150, type: 'Double-room', availability: 'true', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg'},
        { name: 'Serena', price: 200, type: 'Suite', availability: 'true', photo: 'https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg'},
    ];
    
    let form = document.getElementById('searchform');
    let search = document.getElementById('search');
    let searchResultsSection = document.getElementById('search-results-section'); // New line
    let errorMessage = document.getElementById('error_message');
    
    // Function to create and display hotel elements
    function displayHotel(hotel) {
        // Create a container for the hotel details
        let hotelContainer = document.createElement('div');
        hotelContainer.classList.add('hotel-container');

        // Create an image element for the hotel photo
        let photoElement = document.createElement('img');
        photoElement.src = hotel.photo;
        photoElement.alt = hotel.name;
        photoElement.classList.add('hotel-photo');
    
        // Create a div to contain text details
        let detailsContainer = document.createElement('div');
        detailsContainer.classList.add('hotel-details');
    
        // Create paragraph elements for hotel details
        let nameElement = document.createElement('p');
        nameElement.textContent = `Room Name: ${hotel.name}`;
        nameElement.classList.add('hotel-name');
    
        let priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${hotel.price}`;
        priceElement.classList.add('hotel-price');
    
        let typeElement = document.createElement('p');
        typeElement.textContent = `Type: ${hotel.type}`;
        typeElement.classList.add('hotel-type');

        let availabilityElement = document.createElement('p');
        availabilityElement.textContent = `Availability: ${hotel.availability}`;
        availabilityElement.classList.add('hotel-availability');

          // Create a button element for booking
          let bookButton = document.createElement('button');
          if (hotel.availability === 'true') {
              bookButton.textContent = 'Book';
              bookButton.addEventListener('click', function() {
                  bookButton.textContent = 'Booked';
                  bookButton.disabled = true; // Disable the button after booking
              });
          } else {
              bookButton.textContent = 'Not Available';
              bookButton.disabled = true;
          }
    
        // Append photo and text details to the hotel container
        detailsContainer.appendChild(nameElement);
        detailsContainer.appendChild(priceElement);
        detailsContainer.appendChild(typeElement);
        detailsContainer.appendChild(availabilityElement);
        detailsContainer.appendChild(bookButton);
    
        hotelContainer.appendChild(photoElement);
        hotelContainer.appendChild(detailsContainer);
    
        // Append the hotel container to the search results container
        searchResultsSection.insertBefore(hotelContainer, searchResultsSection.firstChild); 
    
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); //prevent deafult submissions
    
        let searchQuery = search.value.trim().toLowerCase();
    
        searchResultsSection.innerHTML = ''; // Clear previous results
        errorMessage.innerHTML = '';
    
        // Filter the hotels array based on the search Query
        let results = hotels.filter(hotel => hotel.type.toLowerCase() === searchQuery);
    
        if (results.length === 0) {
            errorMessage.textContent = 'No results found for your search.';
        } else {
            results.forEach(hotel => {
                // Display each hotel in a neatly organized container
                displayHotel(hotel);
            });
        }
    });
});

    
   // Add click event listener to each payment method button
   // Function to fetch data from the API based on the selected payment method
    function  fetchData(paymentMethod) {
        fetch(`http://localhost:3000/payment-method?method=${paymentMethod}`)
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Failed to fetch data');
            //     }
            //     return response.json();
            // })
            .then(data => {
                console.log(`You've Selected ${paymentMethod} }`);
                alert(`You've selected ${paymentMethod}`);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    document.querySelectorAll('.payment-method-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const paymentMethod = this.dataset.paymentmethod; // Update to dataset.paymentmethod
    
            // Call the fetchData function with the selected payment method
            fetchData(paymentMethod);
        });
    });
    
   // Function to toggle photo visibility
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

// Toggle photo visibility for each photo link
togglePhotoVisibility(document.getElementById('photo-link'), document.getElementById('photo-container'));
togglePhotoVisibility(document.getElementById('photo-link1'), document.getElementById('photo-container1'));
togglePhotoVisibility(document.getElementById('photo-link2'), document.getElementById('photo-container2'));
togglePhotoVisibility(document.getElementById('photo-link3'), document.getElementById('photo-container3'));



