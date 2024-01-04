import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Datatable from 'react-data-table-component';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import Navbar from '../header/Navbar';
import MainLayout from '../../MainLayout';
import '../Role/Role'
import { Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Dialog, Flex, TextField, Text } from '@radix-ui/themes'
// import styles from "./Subcategory.module.css"
import AddSubCategory from "./AddSubCategory"
import UpdateCategory from "./UpdateSubCategory"

const Subcategory = () => {
    const [records, setRecords] = useState([]);
    const [filterRecords, setFilterRecords] = useState([]);

    // state for add role 
    const [empId, setEmpId] = useState('')
    const [empName, setEmpName] = useState('')
    // state for add role end

    // state for update role 
    const [updateName, setUpdateName] = useState('')
    const [updateEmpId, setUpdateEmpId] = useState('')

    // state for update role end

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3900/api/admin/subcategorylist');
                setRecords(res.data);
                console.log("getCategory", res.data)
                setFilterRecords(res.data);
            } catch (err) {
                console.log(err + 'ahh');
            }
        };
        fetchData();
    }, []);

    const column = [
        { name: 'Category ID', selector: (row) => row.category_id, sortable: true },
        { name: 'Subcategory ID', selector: (row) => row.sub_categoryid, sortable: true },
        { name: 'Subcategory Name', selector: (row) => row.sub_categoryname },
        {
            name: 'Subcategory Image', selector: (row) => (
                <div>
                    <img src={row.sub_categoryimg} alt={`Image for ${row.sub_categoryname}`} style={{ width: '50px', height: '50px' }} />
                </div>
            )
        },
        {
            name: 'Action', selector: (row) => 
            // <button className="edit-button">edit </button>
                <UpdateCategory id={row.id} catId={row.category_id} />

        }

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
                fontSize: '16px',
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
                    <div style={{ height: '100%', width: '100%' }}>
                        { /*<div style={{ margin: '20px 0px 20px 260px' }}>*/}
                        <div style={{ display:"flex", justifyContent:"space-around", marginTop:"40px"}}>
                            <div className='addButton'>
                                { /*  <button className="edit-button" > Add Subcategory  </button> */}
                                <AddSubCategory />
                            </div>
                            <div>
                                <input type="text" placeholder="Search..." onChange={handleFilter} />
                                <button> ok </button>
                            </div>

                        </div>


                        { /* <div style={{ display: 'flex' }}> */} 
                        <div>
                            <div style={{ width: '90%', margin: '30px' }}>
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
                        </div >

                    </div>
                </div>
            </div>
        </>
    );
};

export default Subcategory;
