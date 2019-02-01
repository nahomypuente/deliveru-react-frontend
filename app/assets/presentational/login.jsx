import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, Nav, NavItem, NavLink,
         Navbar, NavbarBrand, Button, Row, Col } from 'reactstrap'

export default function LoginForm(props) {
  let { loading, handleSubmit, handleChange, loging, id, isProvider,
        redirect } = props;

  if (loading) {
    return (
      <div className="body text-center my-3">
        <div className="fa-3x my-3">
        <i className="fas fa-spinner fa-spin"/>
        </div>
        <h4>Loading...</h4>
      </div>
    );
  } else {
    return (
      <div className="body">
        <Navbar color="primary" light expand="sm">
          <NavbarBrand href="/">Deliveru</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signup">Registrate</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Iniciar Sesión</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        <Row>
          <Col xs="9" md={{ size: 8, offset: 2 }}>
            <div className="main-div">
              <h1 className="display-3 text-center mb-5">
                ¡Inicia Sesion!</h1>
              <h5 className="text-center mb-5">
                Inicia sesion con el correo electronico que usaste a
                <Link to={'/signup'}> registrarte</Link></h5>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" name="email" value={loging.email}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" value={loging.password}
                    onChange={handleChange} />
                </FormGroup>
                <Button>Iniciar Sesion</Button>
              </Form>
            </div>
          </Col>
        </Row>
        { (isProvider) ? (
            (redirect ? (<Redirect to={"/profile"}/>) : (""))
          ) : (
            (redirect ? (<Redirect to={"/"}/>) : (""))
          )
        }
      </div>
    );
  }
}

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  isProvider: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  loging:PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};
