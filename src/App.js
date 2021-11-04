import './App.css';
import Axios from 'axios';
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Container, Row, Col} from "react-bootstrap";
Axios.defaults.baseURL = 'http://192.168.1.227:8000';

function App() {
  const [coupons, setCoupons] = useState(["initgroup"]);
  const coupArray = [{"id":1, "title":"Back Massage", "desc":"I will give you 30 minute back massage", "request_by":"2 hours",
      "requested_for":null, "used":false, "color":"primary",
      "image":"https://www.clipartmax.com/png/full/324-3245215_clip-library-back-massage-clip-art.png"
  },
      {"id":2, "title":"Esther's Lasagna", "desc":"Esther will make you a lasagna", "request_by":"10 days",
          "requested_for":null, "used":false, "color":"secondary",
          "image":"https://www.clipartmax.com/png/full/143-1434384_greet-garfield-in-munzee-in-garfield-black-and-white.png"
      },
      {"id":3, "title":"Esther's Nopales", "desc":"Esther will make you a nopales salad", "request_by":"7 days",
          "requested_for":null, "used":false, "color":"success",
          "image":"https://www.clipartmax.com/png/full/0-3121_black-clipart-cactus-cactus-black-and-white.png"
      },
      {"id":4, "title":"Morning Bedside Service",
          "desc":"I will wake up before you and make you breakfast, serve you coffee, and do anything else you'd want me to do",
          "request_by":"12 hours", "requested_for":null, "used":false, "color":"danger",
          "image":"https://www.clipartmax.com/png/full/1-13065_coffee-cup-clip-art-coffee-cup-clip-art.png"
      },
      {"id":5, "title":"Homework Help", "desc":"I will dedicate 4 hours to help you on a school assignment of your choice",
          "request_by":"3 days", "requested_for":null, "used":false, "color":"warning",
          "image":"https://www.clipartmax.com/png/full/14-145197_homework-homework-icon-black-and-white.png"
      },
      {"id":6, "title":"Clean Kitchen", "desc":"I will wash dishes, wipe surfaces, and sweep your kitchen",
          "request_by":"24 hours", "requested_for":null, "used":false, "color":"info",
          "image":"https://www.clipartmax.com/png/full/89-899344_cleaning-spray-gun-comments-clip-art-clean-spray.png"
      },
      {"id":7, "title":"Clean Bathroom", "desc":"I will scrub your shower, clean your toilet and sinks, and vacuum your bathroom",
          "request_by":"24 hours", "requested_for":null, "used":false, "color":"light",
          "image":"https://www.clipartmax.com/png/full/37-378368_how-to-start-potty-training-a-resource-guide-my-bored-clip-art.png"
      },
      {"id":8, "title":"Starbucks Run", "desc":"I will wake up early and get you a starbucks drink for when you wake up",
          "request_by":"12 hours", "requested_for":null, "used":false, "color":"dark",
          "image":"https://www.clipartmax.com/png/full/102-1021317_additionally-starbucks-constant-engagement-with-fans-starbucks-gift-card-value.png"
      },
      {"id":9, "title":"Clean your fridge", "desc":"I will throw out anything that's gone bad, and wipe down surfaces in your fridge",
          "request_by":null, "requested_for":null, "used":false, "color":"primary",
          "image":"https://www.clipartmax.com/png/full/117-1176506_stainless-steel-fridge-sprite-015-club-penguin-fridge.png"
      },
      {"id":10, "title":"Inwood Sleepover", "desc":"I will spend the night at inwood with you", "request_by":"8 hours",
          "requested_for":null, "used":false, "color":"success",
          "image":"https://www.clipartmax.com/png/full/2-21103_home-house-silhouette-icon-building-transparent-background-home-icon.png"
      }
  ]
  function isConditional(request_by){
    if(request_by){
        return <Card.Text className="small-text">*This coupon must be requested {request_by} in advance</Card.Text>
    }
    else{
        return <Card.Text/>
    }
  }
  useEffect(() => {
    Axios.get("/api/coupons").then((response) => {
      setCoupons(response.data.coupons);
    });
  }, []);
  console.log(coupons)
  const couponList = coupons.map(c => {
      return (
          // <div className="App">
          <Col lg={4} md={6} sm={12} className="bottom-buffer">
              <Card className="h-100"
                    bg={c.color}
                    text={c.color === 'light' ? 'dark' : 'white'}
              >
                  <Card.Body className="flex-card">
                      <Card.Title> {c.title}</Card.Title>
                      <Row style={{height:"200px", marginTop:"10px"}}>
                        <Card.Img className="mx-auto" style={{height:"80%", width:"auto"}} src={c.image}/>
                      </Row>
                      <Row  className="flexible" style={{marginTop:"5px"}}>
                          <Card.Text>
                              {c.desc}
                          </Card.Text>
                      </Row>
                  </Card.Body>
                  <Card.Footer>
                      {isConditional(c.request_by)}
                  </Card.Footer>
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
