// import React from 'react';
import Navbar from '../header/Navbar';
import Appi from '../../MainLayout';
import SearchBar from './SearchBar';
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "./User.css"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { Col, Form } from 'react-bootstrap';
import AssignRole from './AssignRole';
import ViewRole from './ViewRole';
import { Switch } from '@mui/material'
import AddUser from './AddUser';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

// import SearchIconWrapper from '@mui/icons-material/SearchIconWrapper';
// import StyledInputBase from '@mui/material/StyledInputBase';
// import Search from '@mui/icons-material/Search';
import {
  //https://unicons.iconscout.com/release/v1.0.0/index.html
  UilEdit,
  // Uil-Eye,
  // uil-file
} from "@iconscout/react-unicons";

const itemsPerPage = 5;

const User = () => {
  const [show, setShow] = useState(false); //For Modal
  const [sst, setSst] = useState(0)  //State to check response.data.affetctedRows //
  const [empData, setEmpData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState([]);

  const totalPages = Math.ceil(empData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = empData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  ////////////////////GET/////////////////////////
  const getData = async () => {
    let response = await axios.get('http://localhost:3900/api/admin/userList')
    console.log("Userdata",response)
    setEmpData(response.data)
  }
  useEffect(() => {
    getData()
  }, [])

  // for dropdown of roles in assignroles.jsx
  // const getRoles = async () => {
  //   let response = await axios.post('http://localhost:3900/api/admin/getallroles')
  //   console.log("response of roles",response)
  //   console.log("response of roles")
  //   setRoles(response.data)
  // }
  // useEffect(() => {
  //   console.log("hwuuuuu")

  //   getRoles()
  //   console.log("hwuuuuu")
  // }, [])

  /////////for status Toggle Button///////////////////
  async function activestatus(id) {
    let response = await axios.put(`http://localhost:3900/api/admin/updateUserStatus?status=active&id=${id}`);
    console.log(response)
  }

  async function deactivestatus(id) {
    let response = await axios.put(`http://localhost:3900/api/admin/updateUserStatus?status=deactivate&id=${id}`);
    console.log(response)
  }
  ////////////Below 4 States are for update////////////

  const [neweid, setNewEid] = useState("")
  const [newename, setNewEname] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ////////////////////////////////////
  // it is for role assign
  const [newRole, setNewRole] = useState("")

  async function updateData(eid, ename, dept, sal) {
    console.log(eid, ename, dept, sal)
    setNewEid(eid);
    setNewEname(ename);
    handleShow();
  }

  async function saveUpdatedData() {
    let response = await axios.patch(`http://localhost:3900/api/admin/modifyUser?id=${neweid}`, {
      "name": newename,
    })
    console.log(response)
  }

  // ============================================================
  // Assigning role to user
  // ============================================================

  async function saveRole() {
    let response = await axios.post(`http://localhost:3900/api/admin/updateRole`, {
      "id": neweid,
      "roleid": newRole,
    })
    console.log(response)
  }


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      // padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        // '&:focus': {
        //   width: '20ch',
        // },
      },
    },
  }));
  return (
    <>
        <Navbar />

        <div className='sideanduser' style={{display:"flex"}}>
        <div className='sidebar'>
              <Appi />
        </div>
        <div className='UserTable'>
              {/* here begins user table */}
       <h5 style={{ textAlign: 'center'}}>USERS</h5> 
          <div 
          // style={{
          //   display: 'flex',
          //   flexDirection: 'row',
          //   justifyContent: 'space-between'
          // }}  
          >
            <AddUser />
           {/* <SearchBar /> */}
        </div>  
          <div className='usersBox'>
            <div className='tables'>
              <Table striped >
                <thead>
                  <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>REGISTRARTION DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentData.map((NewItem, index) => {
                      return (
                        <tr key={index} >
                          <td>{NewItem.id}</td>
                          <td>{NewItem.name}</td>
                          {/* <td>{NewItem.password}</td> */}
                          <td> <p style={{fontSize:"16px"}}>{moment(NewItem.createdon).format('Do MMMM YYYY')}
                          {/*  {moment(NewItem.createdon).format('h:mm:ss a')}  */}
                          </p>
                          </td>
                          <td>
                            {
                              (NewItem.status === 'deactivate') ?
                                <Switch
                                  style={{ color: 'grey' }}
                                  onChange={(e) => activestatus(NewItem.id, e)}
                                /> :
                                <Switch
                                  onChange={(e) => deactivestatus(NewItem.id, e)}
                                  defaultChecked />
                            }
                          </td>
                          <td ><UilEdit style={{ color: 'red', }} onClick={() => updateData(NewItem.id, NewItem.name)} />
                          </td>
                          <td><AssignRole id={NewItem.id} />
                            <ViewRole id={NewItem.id} />
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>

{/* for pagination control */}

              <div className="pagination" >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
{/* for pagination control Ends */}



            </div>
          </div>


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form.Label>User Id</Form.Label>
                <Form.Control value={neweid} onChange={(e) => setNewEid(e.target.value)} disabled='true' /> <br />
                <Form.Label>User Name</Form.Label>
                <Form.Control value={newename} onChange={(e) => setNewEname(e.target.value)} /> <br />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                {/* variant="secondary"*/}
                Close
              </Button>
              <Button variant="dark" onClick={() => saveUpdatedData()}>
                {/* variant="primary" */}
                Save
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
        </div>
        </>
  )
}

export default User
