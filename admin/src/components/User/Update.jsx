import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios'
import Form from 'antd/es/form/Form';
import {useState,useEffect} from 'react'
import {
  //https://unicons.iconscout.com/release/v1.0.0/index.html
  UilEdit,
  UilEye
} from "@iconscout/react-unicons";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>UPDATE USER</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:'300px'}}>
        <div>
          <h6 style={{textAlign:'center'}}>USER ID : </h6>
        <form>
          <label style={{fontSize:'14px',paddingBottom:'12px'}}>User Name</label>
          <br/>
          <input/>
          <br/>
          <label style={{fontSize:'14px',paddingBottom:'12px'}}>Password</label>
          <br/>
          <input/>
        </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>UPDATE</Button>
      </Modal.Footer>
    </Modal>
  );
}

const UpdateUsers=() =>{

  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
     <UilEdit style={{color:'green',}} onClick={() => setModalShow(true)}/>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <UilEye
      style={{
        marginLeft:'10px',
        color:'blue'
      }}
      />
    </>
  );
}
export default UpdateUsers;
// render(<App />);
