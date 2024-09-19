import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundColor: '#fde6e1', padding: '50px 0' ,  borderBottomRightRadius:"20px",borderBottomLeftRadius:"20px"}}>
      <Container>
        <Row className="align-items-center" >
          <Col lg={6}>
            <h1 className="display-6 fw-bold text-center" style={{ color: '#fa4a3b' }}>
            Craving Delivered: Fresh Food at Your Doorstep!
            </h1>
            <p style={{ color: '#333', fontSize: '18px' }} className='text-center'>
            Craving something delicious? Get your favorite meals delivered hot and fresh, right to your doorstep! Explore a world of flavors, from comfort food to gourmet delights, with just a few clicks. Fast, reliable, and always satisfying – we bring the taste of joy straight to you! </p>
            <div className="mt-4" style={{display:"flex" ,alignContent:"center" ,justifyContent:"center"}}>
              <Button variant="danger" className="me-3" style={{ backgroundColor: '#fa4a3b', borderColor: '#fa4a3b' }}>View Menu</Button>
            </div>
          </Col>
          <Col lg={6} >
            <img src="./public/Images/3d-4-removebg.png" alt="Delicious Tacos" className="img-fluid rounded hero-pic" style={{height:"500px",width:"500px"}} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroSection;
