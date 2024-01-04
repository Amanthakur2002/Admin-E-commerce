import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

function MyVerticallyCenteredModal(props) {
  const [empId, setEmpId] = useState(props.id);
  const [roles, setRoles] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  async function postData() {
    let response = await axios.post(`http://localhost:3900/api/admin/assignRoleToUser`, {
      "id": empId,
      "roleid": selectedOption,
    })
    console.log(response)
    // console.log("ho gaya")
  }

  //////////////////////GET//////////////////////////
  const getRoles = async () => {
    let response = await axios.post('http://localhost:3900/api/admin/getallroles')
    // console.log("res for roles assign",response)
    // console.log("res rolename",response.data[0].rolename)
    setRoles(response.data)
  }
  useEffect(() => {
    getRoles()
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Assign User Role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='addNew'>
          <Form style={{ border: '1px solid black', borderRadius: '10px' }}>
            <h3 style={{ textAlign: 'center' }}><b>Assign Roles</b></h3>
            <Form.Group className="mb-1" controlId="formBasicEmail">

              <Form.Label>User ID</Form.Label>
              <Form.Control value={props.id} onChange={(e) => setEmpId(e.target.value)} disabled />

              <h4>Roles</h4>
            { /*  <Form.Select aria-label="Default select example">
                <option value="0">Admin</option>
                <option value="1">Manager</option>
                <option value="2">Clerk</option>
                <option value="3">HR</option>
              </Form.Select> 
  */ }
              <Form.Select
                aria-label="Select role"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.rolename}
                  </option>
                ))}
              </Form.Select>

            </Form.Group>

            <Button onClick={() => postData()}>
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

function AssignRole(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}
        style={{ marginLeft: '50px' }}
      >
        Roles Assign
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id = {props.id}
      />
    </>
  );
}

export default AssignRole;