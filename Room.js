import React from 'react'
import { Modal, Button,Carousel } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Room = ({room, fromdate, todate}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className='row'  style={{
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0.20, 0.20, 0.20, 0.25)', // Outer box shadow
        padding: '20px', // Padding for the container
        background: '#fff', // Ensure the background is white for the shadow to pop
      }}>
        <div className='col-md-4'>
            <img src={room.imageurls[0]} alt='imag' width={210} height={200} className='rounded' />
        </div>
        <div className='col-md-7'>
            <h4>{room.name}</h4>
            <b><p>Max count : {room.maxcount}</p>
            <p>Phone Number : {room.phonenumber}</p>
            <p>Type : {room.type}</p></b>
            <div style={{float:'right'}}>
                <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-primary m-1">Book now</button>
                </Link>
                <button className='btn btn-primary  ' onClick={handleShow}>View Details</button>
            </div>
        </div>
 
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Carousel>
                {
                    room.imageurls.map(url =>{
                        return <Carousel.Item>
                        <img src={url} alt='imga' height={350} width={800}/>
                        <Carousel.Caption>
                          <h3>First slide label</h3>
                          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    })
                }
            </Carousel>
            <p>{room.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
            Close
                </Button>
            <Button variant="primary" onClick={handleClose}>
            Save Changes
              </Button>
            </Modal.Footer>
        </Modal>
    </div>
  ) 
}

export default Room
