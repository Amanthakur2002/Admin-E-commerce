import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios'
import Form from 'antd/es/form/Form';
import {useState,useEffect} from 'react'
import {
  //https://unicons.iconscout.com/release/v1.0.0/index.html
  UilSync,
  
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
          <b>UPDATE ROLE</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:'300px'}}>
        <div>
          {/* <h6 style={{textAlign:'center'}}>USER ID : </h6> */}
        <form>
          <label style={{fontSize:'14px',paddingBottom:'12px'}}>Roll ID</label>
          <br/>
          <input/>
          <br/>
          <label style={{fontSize:'14px',paddingBottom:'12px'}}>Roll Name</label>
          <br/>
          <input/>
        </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

const UpdateRole=() =>{
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
     <UilSync style={{color:'green',}} onClick={() => setModalShow(true)}/>
     

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export const addRole = () => {
  return(<>
  <div className='addNewRole'>
<Form style={{border: '1px solid black',borderRadius:'10px'}}>
<h3 style={{textAlign:'center'}}><b>Add New Role</b></h3>
<Form.Group className="mb-1" controlId="formBasicEmail">
  <Form.Label>Role ID</Form.Label>
  <Form.Control/>
  {/* <Form.Control value={empid} onChange={(e)=>setEmpId(e.target.value)} /> */}
</Form.Group>

<Form.Group className="mb-1" controlId="formBasicPassword">
  <Form.Label>Role Name</Form.Label>
  <Form.Control/>
  {/* <Form.Control value={empname} onChange={(e)=>setEmpName(e.target.value)} /> */}
</Form.Group>
{/* {
(sst === 1)
?<p style={{color:'green'}}>Registration Done</p>
:<p style={{color:'red'}}>Something went wrong, try later!!!</p>
} */}

<Button >
  Submit
</Button>
</Form>

</div>
  </>)
}

export default UpdateRole;

