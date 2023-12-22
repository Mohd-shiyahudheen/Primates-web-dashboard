import React, { useState } from "react";
import "./Addmember.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Addmember = () => {
  const [name, setName] = useState("");
  const [posission, setPosission] = useState("");
  const [twitter, setTwitter] = useState("");
  const [insta, setInsta] = useState("");
  const [fb, setFb] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");

  const navigate = useNavigate();

  const memberPicture = (e) => {
    setPicture(e.target.files[0]);
  };

  const newMember = async (e) => {
    e.preventDefault();
    try {
      const addMember = new FormData();

      addMember.append("name", name);
      addMember.append("posission", posission);
      addMember.append("twitter", twitter);
      addMember.append("instagram", insta);
      addMember.append("facebook", fb);
      addMember.append("linkedin", linkedin)
      addMember.append("picture", picture)

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/addTeam`, addMember).then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/");
  };
  return (
    <div className="main">
      <Container fluid>
        <Row>
          <Col className="col-1" sm={12} md={2}>
            <div className="logo-sidebar my-3">
              <img
                style={{ width: "180px", height: "50px" }}
                src={require("./Asset/logo alt1.png")}
                alt=""
              />
            </div>
            <div className="list">
              <ul className="side-list">
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li className="my-4 dash">
                    {" "}
                    <span>
                      <i class="bx bxs-dashboard fs-4"></i>
                    </span>{" "}
                    Dashboard
                  </li>
                </Link>
                <Link
                  to="/addBlog"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li className="my-4 dash">
                    {" "}
                    <span>
                      <i class="bx bxs-add-to-queue fs-4"></i>
                    </span>{" "}
                    Add Blog
                  </li>
                </Link>
                <Link
                  to="/addMember"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li className="my-4 dash">
                    {" "}
                    <span>
                      <i class="bx bx-user-plus fs-3"></i>
                    </span>
                    Add Member
                  </li>
                </Link>
              </ul>
              <div>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </Col>
          <Col className="col-2" sm={12} md={10}>
            <Card
              className="mx-auto my-5"
              style={{ width: "22rem", borderBlockColor: "blue" }}
            >
              <Card.Body>
                <Card.Title className="add-member">Add New Member</Card.Title>
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  type="text"
                  label="Name"
                  color="primary"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  type="text"
                  label="Posission"
                  color="primary"
                  variant="outlined"
                  value={posission}
                  onChange={(e) => setPosission(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  label="Twitter Link"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  label="Instagram Link"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  label="Facebook Link"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={fb}
                  onChange={(e) => setFb(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "4%" }}
                  id="outlined-basic"
                  label="Linkedin Link"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <TextField
                  style={{ width: "17rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  label="Image"
                  variant="standard"
                  color="primary"
                  focused
                  type="file"
                    onChange={memberPicture}
                />
                <Button
                  style={{ marginLeft: "31%", marginTop: "7%" }}
                  variant="outlined"
                  color="primary"
                  onClick={newMember}
                >
                  Add Member
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Addmember;
