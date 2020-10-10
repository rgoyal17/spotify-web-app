import React from 'react';
import { Container, Row, Col } from "reactstrap";
import ReactRoundedImage from "react-rounded-image";


class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleOnClick(url){
    window.open("https://www.google.com", "_blank")
    console.log("hi")
  }

  render() {
    return (
      <Container>
        <Row className="comp-spacing">
          <Col align='center'>
            <h1>OUR TEAM</h1>
          </Col>
        </Row>
        <Row className="comp-spacing">
          <Col align='center'>
            <ReactRoundedImage 
              image={require('../data/raul.jpg')}
              imageWidth="150"
              imageHeight="150"
              roundedSize="0"
              onClick={(e) => {this.handleOnClick("https://github.com", e)}}
            ></ReactRoundedImage>
          </Col>
          <Col align='center'>
            <ReactRoundedImage 
              image={require('../data/rishabh.jpeg')}
              imageWidth="150"
              imageHeight="150"
              roundedSize="0"
            ></ReactRoundedImage>
          </Col>
          <Col align='center'>
            <ReactRoundedImage 
              image={require('../data/atharv.jpeg')}
              imageWidth="150"
              imageHeight="150"
              roundedSize="0"
            ></ReactRoundedImage>
          </Col>
        </Row>
        <Row>
          <Col align='center'>
            Ritadhwaj Roy Choudhury<br></br>
            Developer<br></br>
            Junior at the Paul G Allen School of Computer Science and Engineering. <br></br>
            rroy21 [at] cs.washington [dot] edu
          </Col>
          <Col align='center'> 
            Rishabh Goyal<br></br>
            Developer<br></br>
            Junior at the University of Washington, studying Computer Science.<br></br>
            rgoyal [at] cs.washington [dot] edu
          </Col>
          <Col align='center'>
            Atharv Wairagade<br></br>
            UI/UX<br></br>
            Junior at the University of Washington, studying HCDE.<br></br>
            athumadarchod [at] gmail [dot] com
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Description;