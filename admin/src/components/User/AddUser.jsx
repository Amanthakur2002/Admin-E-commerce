import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'

function MyVerticallyCenteredModal(props) {
  const [sst, setSst] = useState(0)  //State to check response.data.affetctedRows //
  const[empData, setEmpData] =useState([])
  /////////Below 4 states are for add new data//////////////
  const [empid, setEmpId] = useState("")
  const [empname, setEmpName] = useState("")
  const [password, setPass] = useState("")
  //////////////////POST/////////////////////
 async function postData(){
  let newData = {
    "id": empid,
    "name": empname,
    "password": password
    }
    let response = await axios.post(`http://localhost:3900/api/admin/registerUser`, newData);
    console.log(response.data.affectedRows)
    setSst(response.data.affectedRows)
    console.alert("ok")
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
     
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Add USER
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <div className='addNew'>
      <Form style={{border: '1px solid black',borderRadius:'10px'}}>
      <h3 style={{textAlign:'center'}}><b>Add New User</b></h3>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label>User ID</Form.Label>
        <Form.Control value={empid} onChange={(e)=>setEmpId(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicPassword">
        <Form.Label>User Name</Form.Label>
        <Form.Control value={empname} onChange={(e)=>setEmpName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=>setPass(e.target.value)} />
      </Form.Group>

      <Button onClick={()=>postData()}>
        Submit
      </Button>
    </Form>

      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddUser() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setModalShow(true)}
        // style={{marginLeft:'50px'}}
      >
        Add +
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AddUser;