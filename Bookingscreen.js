import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';

const Bookingscreen = () => {
  const { roomid, fromdate, todate } = useParams(); // Use the hook to access the roomid from the URL
  const [room, setroom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentuser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser)); // Store parsed user object
    }
  }, []);


  useEffect(() => {
    const fetchRooms = async () => { // async because we want to use await keyword
      try {
        setLoading(true) // post because we are sending the room id to backend
        console.log(`Fetching room with ID: ${roomid}`);
        const { data } = await axios.post('http://localhost:3001/api/rooms/getroombyid', { roomid });
        console.log("Rooms data:", data); // Debugging
        setroom(data);  // No .rooms, just data
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("error in booking system ");
      }
    };

    fetchRooms(); // Call the async function
  }, [roomid]);

  let totalDays = 0;
  let totalAmount = 0;
  if (room) {
    totalDays = moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") + 1;
    totalAmount = totalDays * room.rentperday;
  }

  async function bookRoom() {
    if (!currentUser) {
      alert("Room Booked ! Enjoy ");
      return;
    }

    const bookingDetails = {
      room,
      userid: currentUser._id,  // Using state instead of parsing every time
      fromdate,
      todate,
      totalAmount,
      totalDays,
    };

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log("Booking successful:", result.data);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
    }
  }


  return (
    <div className='m-5'>
      {
        loading ? (<Spinner />) : error ? (<div class="alert alert-danger" role="alert">
          This is a warning alert—check it out!
        </div>) : (<div>
          <div className='row justify-content-center mt-5' style={{
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0.20, 0.20, 0.20, 0.55)', // Outer box shadow
            padding: '20px', // Padding for the container
            background: '#fff', // Ensure the background is white for the shadow to pop
          }}>
            <div className='col-md-5' >
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} width={400} height={400} />
            </div>
            <div className='col-md-5' style={{ textAlign: 'right' }}>
              <div>
                <h2>Booking Details</h2>
                <hr />
                <p><strong>Name :</strong> User</p>
                <p><strong>From Date :</strong> {fromdate}</p>
                <p><strong>To Date :</strong> {todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h2>Amount</h2>
                <hr></hr>
                <p>Total days : {totalDays}</p>
                <p>Rent per days : {room.rentperday}</p>
                <p>Total Amount : {totalAmount}</p>
              </div>

              <div style={{ float: "right" }}>
                <button className='btn btn-primary' onClick={bookRoom} >Pay Now</button>
              </div>
            </div>
          </div>
        </div>)
      }
    </div>
  );
};

export default Bookingscreen;