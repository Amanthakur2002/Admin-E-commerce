import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import "./addsubcategory.css"
import "../../assets/editbutton.css"

// comment from div branch

function MyVerticallyCenteredModal(props) {
    const [sst, setSst] = useState(0)  //State to check response.data.affetctedRows //
    const [empData, setEmpData] = useState([])
    /////////Below 4 states are for add new data//////////////
    const [empid, setEmpId] = useState("")
    const [empname, setEmpName] = useState("")
    const [password, setPass] = useState("")
    const [subImg, setSubImg] = useState([])

    //////////////////////GET CATEGORY ID/////////////////////////
    const [category, setCategory] = useState([])

    const getCategory = async () => {
        let response = await axios.get('http://localhost:3900/api/admin/categorylist')
        console.log(response)
        setCategory(response.data)
    }
    useEffect(() => {
        getCategory()
    }, [])

    //////////////////POST/////////////////////

    // async function postData() {
    //     let newData = {
    //         "id": empid,
    //         "name": empname,
    //         "password": password
    //     }
    //     let response = await axios.post(`localhost:3900/api/admin/addSubCat?sub_categoryid={}&category_id={}&sub_categoryname={}`, newData);
    //     console.log(response.data.affectedRows)
    //     setSst(response.data.affectedRows)
    //     console.alert("ok")
    // }


    async function postData(e) {
        // e.preventDefault();
        const formdata = new FormData();

        formdata.append('subimg', subImg)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        
        let response = await axios.post(`http://localhost:3900/api/admin/addSubCat?sub_categoryid=${empid}&sub_categoryname=${empname}&category_id=${password}`,
            formdata, config).then((response) => {
                // console.log(error)
                console.log(response)
            })
        console.log(response)
        // handleCloseADD();
    }

    function handlefile(e) {
        const file = e.target.files[0]
        console.log(file);

        setSubImg(file);

        // form.append('subimg',file)
    }

    function handlefileforgit(e) {
        const file = e.target.files[0]
        console.log(file);

        setSubImg(file);

        // form.append('subimg',file)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            // dialogClassName="custom-modal-size"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='addNew'>
                    <Form style={{ border: '1px solid black', borderRadius: '10px' }}>
                        <h3 style={{ textAlign: 'center' }}><b>Edit Subcategory</b></h3>
                        
                        <Form.Group className="mb-1" controlId="formBasicEmail">

                            <Form.Label>Choose a Category ID :</Form.Label>
                            <Form.Select id="category"
                                value={password}
                                defaultValue={"Choose Category"}
                                onChange={(e) => setPass(e.target.value)}
                            >
                                {
                                    category.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                <option value={item.category_id}
                                                >{item.category_id}
                                                </option>
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Subcategory ID</Form.Label>
                            <Form.Control value={empid} onChange={(e) => setEmpId(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Subcategory Name</Form.Label>
                            <Form.Control value={empname} onChange={(e) => setEmpName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Subcategory Image</Form.Label>
                            <Form.Control type='file' name='subimg' onChange={(e) => handlefile(e)} />
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

function AddSubCategory() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button className='edit-button' size="sm" onClick={() => setModalShow(true)}
            >
                edit
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default AddSubCategory;