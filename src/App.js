import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Container, Row, Table, Col, ListGroup, Button, Image} from "react-bootstrap";
Axios.defaults.baseURL = 'http://10.145.207.210:8000';

function App() {
  const [coupons, setCoupons] = useState(["initgroup"]);
  useEffect(() => {
    Axios.get("/api/coupons").then((response) => {
      setCoupons(response.data.coupons);
    });
  }, []);
  console.log(coupons)
  console.log('hello')
  const couponList = coupons.map(c => {
    return(
        // <div className="App">
          <Col lg={4} md = {6} sm = {12}  className="bottom-buffer">
            {/*<Card className="h-100">*/}
            {/*  <Card.Body className="flex-card">*/}
            {/*    <Card.Title> {c.title} </Card.Title>*/}
            {/*    <Card.Subtitle>*/}
            {/*      {c.desc}*/}
            {/*    </Card.Subtitle>*/}
            {/*  </Card.Body>*/}
            {/*</Card>*/}
            <Card className="h-100">
              <Card.Body className="flex-card">
                <Card.Title> {c.title}</Card.Title>
                <Card.Img className="rounded-circle" style={{width:"100px"}} src={c.image}/>
                {/*<Card.Subtitle class="text-muted"></Card.Subtitle>*/}
                <div className="icon-buffer">
                  <Card.Subtitle>
                    {/*<a href="https://www.cs.utexas.edu/~avalon/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>*/}
                  </Card.Subtitle>
                </div>
                <div className="flexible">
                  <Card.Text>
                    {c.desc}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

    )
  })
  return (
    <div className="App">
      <Container>
        <Row className="flex-container">
          {couponList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
