import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AddBlog.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const craetBlog = async (e) => {
    e.preventDefault();
    try {
      const addBlog = new FormData();

      addBlog.append("title", title);
      addBlog.append("topic", topic);
      addBlog.append("content", content);
      addBlog.append("author", author);
      addBlog.append("image", image);

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/addBlog`, addBlog).then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  //image accepting frontend
  const blogImage = (e) => {
    setImage(e.target.files[0]);
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
              style={{ width: "20rem", borderBlockColor: "blue" }}
            >
              <Card.Body>
                <Card.Title className="add-blog">Add New Blog</Card.Title>
                <TextField
                  style={{ width: "15rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  type="text"
                  label="Title"
                  color="primary"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  style={{ width: "15rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  type="text"
                  label="Topic"
                  color="primary"
                  variant="outlined"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <TextField
                  style={{ width: "15rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  label="Content"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <TextField
                  style={{ width: "15rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  label="Author"
                  color="primary"
                  variant="outlined"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                  style={{ width: "15rem", marginLeft: "8%", marginTop: "5%" }}
                  id="outlined-basic"
                  label="Image"
                  variant="standard"
                  color="primary"
                  focused
                  type="file"
                  onChange={blogImage}
                />
                <Button
                  style={{ marginLeft: "33%", marginTop: "7%" }}
                  variant="outlined"
                  color="primary"
                  onClick={craetBlog}
                >
                  Add Blog
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Addblog;
