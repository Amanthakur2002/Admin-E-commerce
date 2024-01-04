import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./viewrole.css";
import axios from 'axios';

function ViewRole(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// state for userid 
  const [id, setid] = useState(props.id) 
  // states to get roles
const [roles, setRoles] = useState([])

  //////////////////////GET//////////////////////////
  // const getRolesbyId = async () => {
  //   console.log("res view/revoke 1")
  //   let response = await axios.post('http://localhost:3900/api/admin/getAssignedRolesById',id)
  //   console.log("res view/revoke 2")

  //   console.log("res for view/revoke", response)
  //   // console.log("res rolename",response.data[0].rolename)
  //   setRoles(response.data)

  // }

  const getRolesbyId = async () => {
    try {
      console.log("res view/revoke 1");
      let response = await axios.post('http://localhost:3900/api/admin/getAssignedRolesById', { id: id });
      console.log("res view/revoke 2");
      console.log("res for view/revoke", response.data);
      setRoles(response.data);
    } catch (error) {
      console.error("Error while making the API call:", error);
    }
  };

  useEffect(() => {
    getRolesbyId()
  }, [show]) 

  const handleRoleRevoke = async ( rolename ) => {
    try {
      console.log("res view/revoke 1");
 
      let response = await axios.post('http://localhost:3900/api/admin/revokeRole', { id: id, rolename : rolename });
      console.log("res view/revoke 2");
      console.log("res for view/revoke", response.data);
      // console.log("first", response.data[0].rolename)
      setRoles(response.data);
      setShow(false)
      alert("hey")
     
    } catch (error) {
      console.error("Error while making the API call:", error);
    }
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}
        style={{
          marginLeft:'10px'
        }}
      >
        View / Revoke
      </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Roles Assigned</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="user-info">
            <h4>User ID:</h4>
            <p>{id}</p>
          </div>
          <div className="user-roles">
            <h4>Roles:</h4>
            <ul>
              {Array.isArray(roles) ? (
                roles.map((roleName, index) => (
                  <li key={index}>
                    {roleName.rolename}
                    <button
                      className="revoke-button"
                      onClick={() => handleRoleRevoke(roleName.rolename, roleName.rolenameprop)}
                    >
                      &#x2716;
                    </button>
                  </li>
                ))
              ) : (
                <p>No roles found</p>
              )}
            </ul>
          </div>
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
    </>
  );
}

export default ViewRole;
