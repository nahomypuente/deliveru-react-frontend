import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Navbar, NavbarBrand,
         Button, Row, Col, Form, FormGroup, Label, Input,
         FormText } from 'reactstrap';
import classnames from 'classnames';

export default function SignUpForm(props) {
  let { loading, handleSubmit, handleChange, providers, consumers,
    locations, redirect, activeTab, toggle, handleClick } = props;

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
        <h4 className="display-3 text-center mb-5">Registrate</h4>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }} >
              Registrate como Consumidor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }} >
              Registrate como Proveedor
              </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={ activeTab }>
          <TabPane tabId="1">
            <br />
            <Row>
              <Col xs="9" md={{ size: 8, offset: 2 }}>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={ consumers.email }
                      onChange={ handleChange } />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Constraseña</Label>
                    <Input type="password" name="password"
                      value={ consumers.password } onChange={ handleChange } />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Select">Ubicación</Label>
                    <Input type="select" name="location" id="Ubicacion">
                      { locations.map((loc, idx) => (
                          <option key={idx} className={loc.id.toString()}
                            onClick={() => { handleClick(loc.id) }}>
                            { loc.name }
                          </option>
                        ))
                      }
                    </Input>
                  </FormGroup>
                  <Button>Registrate</Button>
                </Form>
              </Col>
            </Row>
            { redirect && (<Redirect to={"/login"}/>) }
            </TabPane>
            <TabPane tabId="2">
              <br />
                <Row>
                  <Col xs="9" md={{ size: 8, offset: 2 }}>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email"
                          value={providers.email} onChange={handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" name="password"
                        value={ providers.password }
                        onChange={ handleChange } />
                      </FormGroup>
                      <FormGroup>
                        <Label for="Select">Ubicación</Label>
                        <Input type="select" name="location" id="Ubicacion">
                          { locations.map((loc, idx) => (
                              <option key={idx} className={loc.id.toString()}
                                onClick={() => { handleClick(loc.id) }}>
                                { loc.name }
                              </option>
                            ))
                          }
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="store_name">Nombre</Label>
                        <Input type="text" name="store_name"
                          value={providers.store_name}
                          onChange={ handleChange } />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Máxima Distancia</Label>
                        <Input type="number" name="max_delivery_distance"
                          value={providers.max_delivery_distance}
                          onChange={ handleChange } step="1" />
                      </FormGroup>
                      <Button>Registrate</Button>
                    </Form>
                  </Col>
                </Row>
                { redirect && (<Redirect to={"/login"}/>) }
            </TabPane>
        </TabContent>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  locations: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  providers:PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    location: PropTypes.number.isRequired,
    store_name: PropTypes.string.isRequired,
    max_delivery_distance: PropTypes.number.isRequired
  }),
  consumers:PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    location: PropTypes.number.isRequired
  })
};
