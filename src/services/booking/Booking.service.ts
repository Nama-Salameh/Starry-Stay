import { axiosInstance, handleError } from "../ApisConfig";

const POST_BOOKING_URL = "api/bookings";

const postBooking = async (
  customerName: string,
  hotelName: string,
  roomNumber: string,
  roomType: string,
  bookingDateTime: any,
  totalCost: number,
  paymentMethod: string,
  bookingStatus: string
) => {
  const params = {
    customerName: customerName,
    hotelName: hotelName,
    roomNumber: roomNumber,
    roomType: roomType,
    bookingDateTime: bookingDateTime,
    totalCost: totalCost,
    paymentMethod: paymentMethod,
    bookingStatus: bookingStatus,
  };
  try {
    const response = await axiosInstance.post(POST_BOOKING_URL, params);
    console.log("correctly post");
    console.log(response);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getBooking = async (bookingId: number) => {
  try {
    const response = await axiosInstance.get(`/api/bookings/${bookingId}`);
    console.log("correctly get");
    console.log(response);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export { postBooking, getBooking };
