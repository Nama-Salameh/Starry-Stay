export default interface IRoom {
  roomId: number;
  roomNumber: number;
  roomType: string;
  roomPhotoUrl: string;
  price: number;
  capacityOfAdults: number;
  capacityOfChildren: number;
  availability: boolean;
  roomAmenities: {
    name: string;
    description: string;
  }[];
}
