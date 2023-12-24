import React , {useState , useEffect} from 'react'
import localization from '../../localizationConfig'
import { getRoomAmenitiesByItsId , getRoomPhotosByItsId , getRoomInfoByItsId } from '../../services/rooms/Rooms.service';
export default function RoomDetails() {
const [roomInfo , setRoomInfo] = useState();
const [roomPhotos , setRoomPhotos] = useState();
const [RoomAmenities , setRoomAmenities] = useState();

    useEffect(() => {
        const fetchRoomData = async () => {
          try {
            const hotelInfo = await getRoomInfoByItsId(1);
            setRoomInfo(hotelInfo || {});
    
            const hotelsPhotos = await getRoomPhotosByItsId(1);
            setRoomPhotos(hotelsPhotos || []);
    
            const hotelAmenities = await getRoomAmenitiesByItsId(1);
            setRoomAmenities(hotelAmenities || []);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchRoomData();
      }, []);

      console.log("rooms info : " , roomInfo );
      console.log("rooms photos : " , roomPhotos );
      console.log("rooms amenities : " , RoomAmenities );

  return (
    <div>
      {localization.room}
    </div>
  )
}
