import React from 'react';
import { Container, Row, Col } from "reactstrap";
import ReactRoundedImage from "react-rounded-image";


class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleOnClick = (url) => {
    window.open(url, "_blank")
    console.log("hi")
  }

  render() {
    return (
      <Container>
        <Row className="comp-spacing">
          <Col align='center'>
            <h1>WHAT IS [OUR_NAME]?</h1>
            [OUR_NAME] provides Spotify recommendations based on what <i>you want</i> to listen to. <br></br>
            Heard a song so good that you want more? Try our similar song recommendation feature.
            Maybe you don't know what you are in the mood for today? Try our quiz to get specific
            recommendations based on your mood! 
            You can also login through your Spotify account to get more personalized recommendations and
            statistics about your listening pattern.
          </Col>
        </Row>
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
                ></ReactRoundedImage>
          </Col>
          <Col align='center'>
          <div >
            <ReactRoundedImage 
              image={require('../data/rishabh.jpeg')}
              imageWidth="150"
              imageHeight="150"
              roundedSize="0"
            ></ReactRoundedImage>
          </div>
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
            Junior at the Paul G Allen School of Computer Science and Engineering at University of Washington. <br></br>
            rroy21 [at] uw [dot] edu <br></br>
            <img 
              src={require('../data/github-logo.png')} 
              width='40' alt="github profile" 
              onClick={() => this.handleOnClick("https://www.github.com/raulroy45")}
            ></img>
            <img
              src={require('../data/linkedin-logo.png')} 
              width='30' alt="linkedin profile" 
              onClick={() => this.handleOnClick("https://www.linkedin.com/in/ritadhwaj-r-2054a1103//")}>
            </img>
          </Col>
          <Col align='center'> 
            Rishabh Goyal<br></br>
            Developer<br></br>
            Junior at the Paul G Allen School of Computer Science and Engineering at University of Washington.<br></br>
            rgoyal17 [at] uw [dot] edu <br></br>
            <img 
              src={require('../data/github-logo.png')} 
              width='40' alt="github profile" 
              onClick={() => this.handleOnClick("https://www.github.com/rgoyal17")}>
            </img>
            <img
              src={require('../data/linkedin-logo.png')} 
              width='30' alt="linkedin profile" 
              onClick={() => this.handleOnClick("https://www.linkedin.com/in/rishabh-goyal-0917/")}>
            </img>
          </Col>
          <Col align='center'>
            Atharv Wairagade<br></br>
            UI/UX<br></br>
            Junior at the Human Centered Design and Engineering at University of Washington.<br></br>
            atharvvw [at] uw [dot] edu <br></br>
            <img
              src={require('../data/website-logo.png')} 
              width='40' alt="portfolio" 
              onClick={() => this.handleOnClick("https://www.linkedin.com/in/atharvvw/")}>
            </img>
            <img
              src={require('../data/linkedin-logo.png')} 
              width='30' alt="linkedin profile" 
              onClick={() => this.handleOnClick("https://www.linkedin.com/in/atharvvw/")}>
            </img>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Description;