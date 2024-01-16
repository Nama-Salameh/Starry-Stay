# Starry Stay

It is a platform for booking travel and accommodation, enabling users to book the accommodation that suits them and their desires.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About the project

Starry Stay platform for booking travel and accommodation. provides three flows for different types of users, each of them having his/her permissions:

#### 1. Administrators:

They can manage cities, hotels, and rooms (Can do CRUD operations for each type as a whole and for related info for them as photos, ratings, and amenities). Also, they can search for each type and filter them.

#### 2. Unauthenticated users:

Can browse the cities, hotels, and rooms (featured deals, trending destinations), Can see the details (Photos gallery for all of them, amenities for hotels and rooms, reviews for hotels, the whole rooms, and the available rooms for a specific hotel.) The most important feature that they can do: is search for accommodations based on the destination, the check-in and check-out dates, the number of rooms, and how many the number of adults and children.

#### 3. Authenticated users:

They can do things that the unauthenticated users do, in addition to booking rooms in their hotel and seeing the recently visited hotel.

## Build with

- React
- React router
- React hooks
- React-toastify
- TypeScript
- MUI (Material-UI)
- Formik

## Prerequisites

Make sure you have npm installed before proceeding.

## Installation

You can install the project and run it on your device by these steps :

1. **Clone the repo:**

   ```sh
   git clone https://github.com/Nama-Salameh/Starry-Stay.git
   ```

2. **Install npm packages:**

   ```sh
   npm install
   ```

3. **Run the project:**

   ```sh
   npm start
   ```


## Usage

Welcome to Starry Stay! Below, you'll find a guide on how to navigate and use the platform. Please note that certain features are exclusive to authenticated users. If you don't have an account yet, you can sign up to unlock additional capabilities.

### 1. Home Page

- The home page welcomes users to Starry Stay.
- Featured deals, recently visited hotel, and trending destinations are showcased.
- Users can browse Featured deals, recently visited hotel, and trending destinations cities.
- Users can search for available rooms by filling the destination, check-in and check-out dates, number of rooms, adults, and children.
- Users can click to any of the hotels and cities to view it's details.

### 2. Search Page

- The search page showing the result of search for user.
- Users can filter the search result by ratings.
- Users can sort the search result ascending or descending.
- Authenticated users can adding a rooms to the cart.

### 3. Hotel Page

- The hotel page showing the hotel details (Hotel gallery, hotel description, hotel amenities, whole hotel rooms, the available rooms, customer reviews, and the hotel location on map).
- Authenticated users can adding a rooms to the cart
- Users can open the room details, by click to the room.
- Users can open the specific room details by click to it.

### 4. Room Page

- The room page showing the room details (Room number, room type, room gallery, room amenities, and the capacity of the room).
- Authenticated users can adding a rooms to the cart

### 5. City Page

- The city page showing the city details (City name, city description, city gallery, and the city hotels).
- Users can open the specific hotel details by click to it.

### 6. Checkout page

- This page available only for authenticated users.
- The checkout page opend by click to the cart icon in the top bar.
- The checkout page showing the booked rooms, the personal and payment information.
- Users can confirm their bookings.

### 7. Confirmation page

- This page available only for authenticated users.
- The confirmation page opend by confirm the booking from checkout page.
- The confirmation page showing the booking status, booked rooms and booking information.

### 8. Mange hotels page

- This page available only for admins.
- The Mange hotels page showing all added hotel, and its information.
- The Mange hotels page enabling admin to create a new hotel (Must add the hotel basic information, and can add images and amenities).
- The Mange hotels page enabling admin to search for hotel by it's name or description.

### 8. Mange rooms page

- This page available only for admins.
- The Mange rooms page showing all added rooms for specific hotel, and its information.
- The Mange rooms page enabling admin to create a new room (Must add the room basic information, and can add images and amenities).
- The Mange rooms page enabling admin to search for hotel by it's name or description.

### 8. Mange cities page

- This page available only for admins.
- The Mange cities page showing all added cities, and its information.
- The Mange cities page enabling admin to create a new city (Must add the city basic information, and can add images).
- The Mange cities page enabling admin to search for hotel by it's name or description.


## Contributing

If you have suggestions or improvements, feel free to open an issue with the tag "enhancement".  
Don't forget to give the project a star! Thanks again!

1. **Fork the Project**
2. **Create your Feature Branch:**

   ```sh
   git checkout -b feature/SuggestedFeature
   ```

3. **Commit your Changes:**

   ```sh
   git commit -m 'Add some SuggestedFeature'
   ```

4. **Push to the Branch:**

   ```sh
   git push origin feature/SuggestedFeature
   ```

5. **Open a Pull Request**
