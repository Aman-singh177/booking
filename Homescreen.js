import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Spinner from '../components/Spinner';
import { DatePicker, Space } from 'antd';
import './Homescreen.css';

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading,setLoading] = useState();
  const [error,setError] =useState()

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('http://localhost:3001/api/rooms/getallrooms');
        console.log("Rooms data:", data); // Debugging
        setRooms(data);  // No `.rooms`, just `data`
        setLoading(false)
      } catch (error) {
        setError(true)
        console.log("error");
      }
    };

    fetchRooms(); // Call the async function
  }, []); // Empty dependency array to run only once after the initial render

  function filterByDate(dates, dateStrings) {
    if (dates && dates.length === 2) {
      console.log("Start Date:", dateStrings[0]); 
      console.log("End Date:", dateStrings[1]); 
    } else {
      console.log("No dates selected");
    }
    setfromdate(dateStrings[0]);
    settodate(dateStrings[1]);
  }  

  return (
    <div className='container mt-2'>
      <div className='row'>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100px' }}>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} style={{ height: '50px', fontSize: '18px' }} />
      </div>

      </div> 
      <div className='row justify-content-center mt-5'>
        {
            loading ? (
                <Spinner />
            ) : rooms.length>1 ? (
              rooms.map((room) => {
                return <div className='col-md-9 mt-2'>
                    <Room room = {room} fromdate={fromdate} todate={todate}/>
                </div>
            })
            ) : (
              <div class="alert alert-warning" role="alert">
                This is a warning alert—check it out!
              </div>
            )
        }
      </div>
    </div>
  );
};

export default Homescreen;
