import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Nav, NavItem, NavLink, Navbar,
         NavbarBrand, Button } from 'reactstrap';

export default function Home(props) {
  let { loading, locations, handleSubmit, id, isLoggedIn, redirect,
        handleClick, handleSubmitLogout, isProvider } = props;

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
      <div>
        { isLoggedIn ? (
          <Navbar color="primary" light expand="sm">
            <NavbarBrand href="/">Deliveru</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/profile">Perfil</NavLink>
                </NavItem>
                <NavItem>
                  <Form onSubmit={handleSubmitLogout}>
                    <Button>Cerrar Sesión</Button>
                  </Form>
                </NavItem>
              </Nav>
          </Navbar>
          ) : (
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
          )
        }
        <h1 className="display-3 text-center mb-5">
          ¿Qué vas a comer hoy?</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="Select">Elegí tu ubicacion</Label>
            <Input type="select" name="location" id="Select">
              { locations.map((loc, idx) => (
                <option key={idx} className={loc.id.toString()}
                  onClick={() => { handleClick(loc.id) }}>{ loc.name }</option>
                ))
              }
            </Input>
          </FormGroup>
          <Button>Buscar</Button>
        </Form>
        { (isLoggedIn) ? (
            (redirect ? (<Redirect to={"/delivery/" + id}/>) : (""))
          ) : (
            (redirect ? (<Redirect to={"/login"}/>) : (""))
          )
        }
      </div>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  locations: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isProvider: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired
};
