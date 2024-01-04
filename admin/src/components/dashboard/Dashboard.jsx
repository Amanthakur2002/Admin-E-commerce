import React from 'react'
import Appi from '../../MainLayout';
import Navbar from '../header/Navbar';
import Card from "./Card"
import BarChart from './Chart';
import BasicPie from './PieChart';

const Dashboard = () => {
  return (
    <>

      <Navbar />
      <div className='dashandside' style={{ display: "flex" }}>
        <div className='AppBar'>
          <Appi />
        </div>
        <div className='pagecontent' style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around' }}>

          <div style={{ display: "flex" }}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <div className='charts' style={{ display: "flex", justifyContent: 'space-around', paddingTop: "25px" }} >
            <div className='Bar'>
              <BarChart />
            </div>

            <div className='PieChart'>
              <BasicPie />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Dashboard