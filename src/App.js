import './App.css';
import Axios from 'axios';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {FaCut} from 'react-icons/fa'
import {Card, Container, Row, Col, Button} from "react-bootstrap";

Axios.defaults.baseURL = 'http://54.85.18.85:8080';

function App() {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        Axios.get("/api/coupons").then((response) => {
            setCoupons(response.data.coupons);
        });
    }, []);

    function isConditional(request_by) {
        if (request_by) {
            return <Card.Text className="small-text">*This coupon must be requested {request_by} in advance</Card.Text>
        } else {
            return <Card.Text/>
        }
    }

    function updateCoupons(){
        Axios.get("/api/coupons").then((response) => {
            setCoupons(response.data.coupons);
        });
    }
    function redeemCoupon(c){
        Axios.put('/api/redeem',
            {id:c.id}
        ).then(updateCoupons)
    }

    function createCountdown(date1, date2){
        const diff = Math.abs(date2 - date1)
        const cd = 24 * 60 * 60 * 1000
        const ch = 60 * 60 * 1000
        let days = Math.floor(diff / cd)
        let hours = Math.floor((diff - days * cd) / ch)
        let minutes = Math.round( (diff - days * cd - hours * ch) / 60000)
        if( minutes === 60 ){
            hours++;
            minutes = 0;
        }
        if( hours === 24 ){
            days++;
            hours = 0;
        }
        let daySt = " days "
        let hourSt = " hours "
        let minSt = " minutes"
        if (days === 1){
            daySt = " day "
        }
        if (hours === 1){
            hourSt = " hour "
        }
        if (minutes === 1){
            minSt = " minute"
        }
        return days.toString() + daySt + hours.toString() + hourSt + minutes.toString() + minSt
    }
    const couponList = coupons.map(c => {
        if(c.used){
            return(
                <Col lg={4} md={6} sm={12} className="bottom-buffer">
                    <Card className="h-100"
                          bg={c.color}
                          text={c.color === 'light' ? 'dark' : 'white'}
                    >
                        <Card.Header style={{fontSize: "30px"}}>{c.title}</Card.Header>
                        <Card.Img src={"https://www.clipartmax.com/png/full/147-1477125_book-a-birthday-party-or-rent-the-pavilion-more-confetti-png.png"}
                                  style={{position:"absolute", top:"55px"}}
                        />
                        <Card.Img src={"https://www.clipartmax.com/png/full/147-1477125_book-a-birthday-party-or-rent-the-pavilion-more-confetti-png.png"}
                                  style={{position:"absolute", bottom:"75px"}}
                        />
                        <Card.Img src={'https://www.clipartmax.com/png/full/121-1218350_happy-birthday-with-bunch-of-balloons-png-clip-art-happy-birthday-baloon.png'}
                                  style={{position:"absolute", top:"100px", width:"60%", right:"20%",height:"auto"}}
                        />
                        <Card.Body className="flex-card">
                            <Row style={{height: "200px", marginTop: "10px"}}>
                            </Row>
                            <Row className="flexible" style={{marginTop: "5px"}}>
                            </Row>
                            <Row style={{marginTop:"20px"}}>
                                <Button
                                    variant={c.color === 'light' ? 'dark' : 'light'}
                                    onClick={() => redeemCoupon(c)}
                                >
                                <Card.Text style={{fontSize: "30px"}}>Coupon Redeemed</Card.Text>
                                </Button>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text className="small-text">Worth the wait?</Card.Text>
                        </Card.Footer>
                    </Card>

                </Col>
            )
        }
        let now = new Date()
        let ptime = new Date(c.ptime)
        console.log("NOW")
        console.log(now)
        console.log("PTIME")
        console.log(ptime)
        if(ptime > now){
            return (
                <Col lg={4} md={6} sm={12} className="bottom-buffer">
                    <Card className="h-100"
                          bg={c.color}
                          text={c.color === 'light' ? 'dark' : 'white'}
                    >
                        <Card.Header>
                            <Card.Text style={{fontSize: "25px"}}>{createCountdown(now, ptime)}</Card.Text>
                        </Card.Header>
                        <Card.Body className="flex-card blur">
                            <Row style={{height: "200px", marginTop: "10px"}}>
                                <Card.Img className="mx-auto" style={{height: "80%", width: "auto"}} src={c.image}/>
                            </Row>
                            <Row className="flexible" style={{marginTop: "5px"}}>
                                <Card.Text>
                                    {c.desc}
                                </Card.Text>
                            </Row>
                            <Row style={{marginTop:"20px"}}>
                                <Button
                                    variant={c.color === 'light' ? 'dark' : 'light'}
                                    onClick={() => redeemCoupon(c)}
                                >
                                    <Row>
                                        <Col lg={2} md={2} sm={2}>
                                            <FaCut size="45px" style={{marginLeft: "12px"}}/>
                                        </Col>
                                        <Col className="align-content-center" lg={8} md={8} sm={8}
                                             style={{alignItems: "center"}}>
                                            <Card.Text style={{fontSize: "30px"}}>Redeem</Card.Text>
                                        </Col>
                                    </Row>
                                </Button>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="blur">
                            {isConditional(c.request_by)}
                        </Card.Footer>
                    </Card>
                </Col>

            )
        }
        else{
            return (
                // <div className="App">
                <Col lg={4} md={6} sm={12} className="bottom-buffer">
                    <Card className="h-100"
                          bg={c.color}
                          text={c.color === 'light' ? 'dark' : 'white'}
                    >
                        <Card.Header style={{fontSize: "30px"}}>{c.title}</Card.Header>
                        <Card.Body className="flex-card">
                            <Row style={{height: "200px", marginTop: "10px"}}>
                                <Card.Img className="mx-auto" style={{height: "80%", width: "auto"}} src={c.image}/>
                            </Row>
                            <Row className="flexible" style={{marginTop: "5px"}}>
                                <Card.Text>
                                    {c.desc}
                                </Card.Text>
                            </Row>
                            <Row style={{marginTop:"20px"}}>
                                <Button
                                    variant={c.color === 'light' ? 'dark' : 'light'}
                                    onClick={() => redeemCoupon(c)}
                                >
                                    <Row>
                                        <Col lg={2} md={2} sm={2}>
                                            <FaCut size="45px" style={{marginLeft: "12px"}}/>
                                        </Col>
                                        <Col className="align-content-center" lg={8} md={8} sm={8}
                                             style={{alignItems: "center"}}>
                                            <Card.Text style={{fontSize: "30px"}}>Redeem</Card.Text>
                                        </Col>
                                    </Row>
                                </Button>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            {isConditional(c.request_by)}
                        </Card.Footer>
                    </Card>
                </Col>
            )
        }
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
