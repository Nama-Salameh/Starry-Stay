<p align="center">
  ![foothill](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/ca46ad7e-9d34-4ccd-9511-df389846fe94)
</p>
<hr>
# Starry Stay

Explore the world with Starry Stay! A platform for booking travel and accommodation.

**Design:** [Figma Design](https://www.figma.com/proto/L7CXtGogw7r7TSYQa1wjCf/Starry-Stay--Travel-and-accomodation-booking?type=design&node-id=50-1561&t=a9EV51jtzCO6IUBw-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=50%3A1561&show-proto-sidebar=1)  

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
   if it's not run, can use
   
   ```sh
   npm install --force
   ```

4. **Run the project:**

   ```sh
   npm start
   ```


## Usage

Welcome to Starry Stay! Below, you'll find a guide on how to navigate and use the platform. Please note that certain features are exclusive to authenticated users. If you don't have an account yet, you can sign up to unlock additional capabilities.

### 1. Home Page

- The home page welcomes users to Starry Stay.
- Featured deals, recently visited hotels, and trending destinations are showcased.
- Users can browse Featured deals, recently visited hotels, and trending destinations cities.
- Users can search for available rooms by filling in the destination, check-in and check-out dates, number of rooms, adults, and children.
- Users can click on any of the hotels and cities to view their details.  

![Home page 1](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/59e4626d-8d24-46d6-934e-c463594702be)  

![Home page 2](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/6e9a8c7e-5181-4da3-8ff8-1bfc6bb483c2)  

![Home page 3](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/56cbdb29-ad90-4c8b-b0d7-228999eb906b)  


### 2. Search Page

- The search page shows the result of the user search.
- Users can filter the search results by ratings.
- Users can sort the search results ascending or descending.
- Authenticated users can add a room to the cart.  
    
![Search page](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/db9356c1-ad87-4c9d-aefc-5786d337e2e1)


### 3. Hotel Page

- The hotel page showing the hotel details (Hotel gallery, hotel description, hotel amenities, whole hotel rooms, the available rooms, customer reviews, and the hotel location on the map).
- Authenticated users can add a room to the cart
- Users can open the room details, by clicking to the room.
- Users can open the specific room details by clicking on it.  

![Hotel page](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/99c1cfd5-e98c-492d-be6f-e0024b9d5f84)


### 4. Room Page

- The room page showing the room details (Room number, room type, room gallery, room amenities, and the capacity of the room).
- Authenticated users can add a room to the cart.  

![Room page](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/deb240ba-5c6b-4329-9f29-b2329827a324)


### 5. City Page

- The city page shows the city details (City name, city description, city gallery, and the city hotels).
- Users can open the specific hotel details by clicking on them.  

![City page](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/26e42841-3c33-491a-8a6c-a443d7fa5e89)


### 6. Checkout page

- This page is available only for authenticated users.
- The checkout page opened by clicking on the cart icon in the top bar.
- The checkout page shows the booked rooms and the personal and payment information.
- Users can confirm their bookings.  

![Checkout page 1](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/50387bcb-31f3-498c-9efc-927da032344a)  
![Checkout page 2](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/5ff240c5-0c15-41ea-9402-41e5d854145d)


### 7. Confirmation page

- This page is available only for authenticated users.
- The confirmation page opened by confirming the booking from the checkout page.
- The confirmation page shows the booking status, booked rooms, and booking information.
- Users can save and print the information as a pdf file. 

![Confirmation page](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/0a486fdb-37a9-4ba6-9447-6fbe449719da)


### 8. Mange hotels page

- This page is available only for admins.
- The Mange hotels page shows all added hotels and their information.
- The Mange hotels page enables the admin to create a new hotel (Must add the hotel basic information and can add images and amenities).
- The Mange hotels page enables the admin to search for the hotels by their name or description.
  
![Manage hotels](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/02f0709a-7512-4ed9-b510-df87f3eb3c38)  

### 8. Mange rooms page

- This page is available only for admins.
- The Mange rooms page shows all added rooms for a specific hotel and their information.
- The Mange rooms page enables the admin to create a new room (Must add the room basic information and can add images and amenities).  

![Manage rooms](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/26f57413-6c3b-4ff7-8fea-ca3abf316a37)  


### 8. Manage cities page

- This page is available only for admins.
- The Mange cities page shows all added cities and their information.
- The Mange cities page enables the admin to create a new city (Must add the city basic information and can add images).
- The Mange cities page enables the admin to search for the cities by their name or description.  

![Manage cities](https://github.com/Nama-Salameh/Starry-Stay/assets/92352860/0a764bd0-4d5b-460c-9187-60ca15b535c9)  


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

## Acknowledgment
I extend my sincere gratitude to **Foothill Technology Solutions** for granting me the opportunity to participate in this internship cycle. Their unwavering support has been instrumental throughout the development of this project.


