export default interface IHotel {
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: [
    {
      id: number;
      name: string;
      description: string;
    }
  ];
}
