import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer>
      <div className='cs-container cs-footer'>
        <Row>
          <Col className='text-center py-3 fc'>Copyright &copy; Rippletone</Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
