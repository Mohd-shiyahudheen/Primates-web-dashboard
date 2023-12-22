import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom';
import EnhancedTable from '../../Components/Table/Table';
import EmployeeTable from '../../Components/Employee/Employee'
import axios from 'axios';
// require('dotenv').config()

const Dashboard = () => {
const [blog, setBlog] = useState([])
const [team, setTeam] = useState([])


const renderAfterCalled = useRef(false);
const navigate = useNavigate()

const BlogData = async()=>{
  try {
    const fetchBlog = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogData`)
    .then((res)=>res.data.data)
    .catch((err)=>console.log(err))
    console.log(fetchBlog);
    if (fetchBlog) {
      setBlog(fetchBlog)
    }
  } catch (error) {
    alert(error)
  }
}

const FetchteamData = async () =>{
  try {
    const teamData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/teamData`)
    .then((res)=>res.data.data)
    .catch((err)=>console.log(err))
    console.log(teamData);
    if (teamData) {
      setTeam(teamData)
    }
  } catch (error) {
    
  }
}

  const logout = () =>{
    localStorage.removeItem('adminInfo')
    navigate('/')
  }

  useEffect(() => {
    if (!renderAfterCalled.current) {
      BlogData()
      FetchteamData()
    }
    renderAfterCalled.current = true;
  }, []);
  
  return (
    <div className='main'>
      <Container fluid>
        <Row>
          <Col className='col-1' sm={12} md={2}>
            <div className='logo-sidebar my-3'>
              <img style={{ width: "180px", height: "50px" }} src={require("./Asset/logo alt1.png")} alt="" />
            </div>
            <div className='list'>
              <ul className='side-list'>
                <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
                  <li className='my-4 dash'> <span><i class='bx bxs-dashboard fs-4'></i></span> Dashboard</li>
                </Link>
                <Link to="/addBlog" style={{ textDecoration: "none", color: "black" }}>
                  <li className='my-4 dash'> <span><i class='bx bxs-add-to-queue fs-4'></i></span> Add Blog</li>
                </Link>
                <Link to="/addMember" style={{ textDecoration: "none", color: "black" }}>
                  <li className='my-4 dash'> <span><i class='bx bx-user-plus fs-3'></i></span>Add Member</li>
                </Link>
              </ul>
              <div>
                <button onClick={logout} className='logout-btn'>Logout</button>
              </div>
            </div>
          </Col>
          <Col className='col-2' sm={12} md={10}>
            <div className='main-border'>
            <div className='left-side my-3'>
              <EnhancedTable data={blog}/>
            </div>
            <div className='right-side my-4'>
              <EmployeeTable data={team}/>
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
