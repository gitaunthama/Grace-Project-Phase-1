// Wait till the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the DOM elements needed
// Let's assume this is your hotel data
let hotels = [
    { name: 'Palm Before Pine', price: 200, type: 'Suite', availability: 'true'},
    { name: 'Oceanside Escape', price: 150, type: 'Single-room', availability: 'true', photo: ('http://glitz.bangkokhotel24.com/data/Pics/OriginalPhoto/1172/117231/117231646/glitz-hotel-bangkok-pic-5.JPEG')},
    { name: 'Sunnyside Up', price: 250, type: 'Suite', availability: 'false',photo: ('https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg')},
    { name: 'Elite Palace', price: 100, type: 'Double-room',availability: 'true', photo:('https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg')},
    { name: 'Sarova-w', price: 200, type: 'Suite', availability: 'true',photo: ('https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg')},
    { name: 'Cape place', price: 150, type: 'Single-room', availability:'true',photo: ('http://glitz.bangkokhotel24.com/data/Pics/OriginalPhoto/1172/117231/117231646/glitz-hotel-bangkok-pic-5.JPEG')},
    { name: ' Loung Place', price: 150, type: 'Double-room', availability:'true', photo: ('https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg')},
    { name: 'Serena',price: 200, type: 'Suite', availability: 'true', photo: ('https://i.insider.com/5b50e40d7708e935033b7b68?width=1000&format=jpeg&auto=webpg')},

    
  ];
  
  let form = document.getElementById('searchform');
  let search = document.getElementById('search');
  let searchResults = document.getElementById('search-results');
  let errorMessage = document.getElementById('error_message');
  
  // Listen for the form submit event
  form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      let searchQuery = search.value.trim().toLowerCase();
  
      searchResults.innerHTML = '';
      errorMessage.innerHTML = '';
  
      // Filter the hotels array based on the search Query
      let results = hotels.filter(hotel => hotel.type.toLowerCase() === searchQuery);
  
      if (results.length === 0) {
          errorMessage.textContent = 'No results found for your search.';
      } else {
          results.forEach(hotel => {
              let hotelElement = document.createElement('p');
              hotelElement.textContent = `Room Name: ${hotel.name}, Price: ${hotel.price}, Type: ${hotel.type}`;
              searchResults.append(hotelElement);
          });
      }
  });

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