import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Datatable from 'react-data-table-component';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import Navbar from '../header/Navbar';
import MainLayout from '../../MainLayout';
import './Role.css'
import { Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Dialog, Flex, TextField, Text } from '@radix-ui/themes'

const Role = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  // state for add role 
  const [ empId, setEmpId] = useState('')
  const [ empName, setEmpName] = useState('')
  // state for add role end

  // state for update role 
  const [updateName, setUpdateName] = useState('')
  const [updateEmpId, setUpdateEmpId] = useState('')

  // state for update role end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:3900/api/admin/getRoles');
        setRecords(res.data);
        console.log(res.data)
        setFilterRecords(res.data);
      } catch (err) {
        console.log(err + 'ahh');
      }
    };
    fetchData();
  }, []);

  const column = [
    { name: 'ROLE ID', selector: (row) => row.roleid, sortable: true },
    { name: 'Role Name', selector: (row) => row.rolename, sortable: true },
    {
      name: 'Action',
      selector: (row) => (
        <div>
         {/* &nbsp; <button className="edit-button">
             Edit
      </button>  */}
          <Dialog.Root>
            <Dialog.Trigger>
              <button className="edit-button">edit </button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Edit Role</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your roles.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Role ID
                  </Text>
                  <TextField.Input
                    disabled
                    defaultValue={row.roleid}
                    onChange={(e) => setUpdateEmpId(e.target.value)}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Role Name
                  </Text>
                  <TextField.Input
                    defaultValue={row.rolename}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </label>
              </Flex>


              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={HandleUpdate}>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      ),
    },
  ];

  // async function HandleUpdate() {
  //   let newData = {
  //     "roleid": updateEmpId,
  //     "rolename": updateName
  //   }
  //   let response = await axios.put(`http://localhost:3900/api/admin/updateRole`,newData);
  //   console.log(response.data.affectedRows)
  //   // setSst(response.data.affectedRows)
  //   console.log("sfzd",newData)
  //   console.log("ok")
  // }

  async function HandleUpdate() {
    console.log("first", updateEmpId)
    try {
      let newData = {
        roleid: updateEmpId,
        rolename: updateName,
      };

      // Check if updateEmpId is not empty or null before making the request
      console.log("sfzd", newData);

      if (newData.roleid !== null && newData.roleid !== undefined && newData.roleid !== '') {
        let response = await axios.put(`http://localhost:3900/api/admin/updateRole`, newData);
        console.log(response.data.affectedRows);
        // setSst(response.data.affectedRows)
        console.log("sfzd", newData);
        console.log("ok");
      } else {
        console.log('Role ID is empty or invalid.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }

  const customStyles = {
    rows: {
      style: {
        fontSize: '16px',
        background: 'linear-gradient(to right, #f0f8ff, #e6e6fa)',
        color: '#191970',
        borderBottom: '1px solid #b0c4de',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(to right, #d8e4ff, #c0d6ff)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #1e90ff, #0000cd)',
        color: '#f0f8ff',
        borderBottom: '2px solid #000080',
      },
    },
    '@media (max-width: 768px)': {
      rows: {
        style: {
          fontSize: '14px',
        },
      },
      headCells: {
        style: {
          fontSize: '16px',
        },
      },
    },
  };

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) => row.rolename.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  };

  async function postData() {
    let newData = {
      "roleid": empId,
      "rolename": empName
    }
    let response = await axios.post(`http://localhost:3900/api/admin/addrole`, newData);
    console.log(response.data.affectedRows)
    // setSst(response.data.affectedRows)
   console.log("ok")
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="sideanduser" style={{ display: 'flex' }}>
          <div className="sidebar">
            <MainLayout />
          </div>
          <div style={{ height:'100%', width: '100%' }}>
            <div style={{ margin: '20px 30px' }}>
              <input type="text" placeholder="Search..." onChange={handleFilter} />          
              
            
              </div>

            <div style={{ display: 'flex' }}>
              <div style={{ width: '45%', marginLeft: '30px' }}>
                <Datatable
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                  customStyles={customStyles}
                  columns={column}
                  data={records}
                  // Set the width of the Datatable to 100%
                  style={{ width: '100%' }}
                ></Datatable>
              </div>

              <div style={{ marginLeft: '50px' }}>
                <div className='addNewRole' style={{ marginTop: '-40px' }}>
                  <Form style={{ border: '1px solid black', borderRadius: '10px',  }}>
                    <h3 style={{ textAlign: 'center' }}><b>Add New Role</b></h3>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                      <Form.Label>Role ID</Form.Label>
                      {/* <Form.Control /> */}
                      <Form.Control value={empId} onChange={(e)=>setEmpId(e.target.value)} /> 
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicPassword">
                      <Form.Label>Role Name</Form.Label>
                      <Form.Control value={empName} onChange={(e) => setEmpName(e.target.value)} /> 

                    </Form.Group>

                    <Button onClick={postData} >
                      Submit
                    </Button>
                  </Form>

                </div>

         </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );



};

export default Role;
