import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Form, InputGroupAddon, Input, Col, Row, InputGroupText, Nav,
         NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';

export default function OrderForm(props) {
  let { loading, handleSubmit, handleChange, items , redirect } = props;

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
              <NavLink href="/profile">Perfil</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <br />
        <h1 className="display-3 text-center mb-5">
          ¡Hacé tu pedido!</h1>
        <br />
        <Row>
          <Col xs="7" md={{ size: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              <div>
                { items.map((item, idx) =>
                  <div key={idx} className={item.id.toString()}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{ item.name }</InputGroupText>
                      <InputGroupText>$ { item.price }</InputGroupText>
                      <Input name={item.id} id={idx} type="number"
                        placeholder="cantidad..." value={items.amount}
                        onChange={handleChange} />
                    </InputGroupAddon>
                  </div>
                )}
              </div>
              <br />
              <Button color="success"><b>Agregar Orden</b></Button>
            </Form>
            {redirect && (<Redirect to={"/orders"}/>)}
          </Col>
        </Row>
      </div>
    );
  }
}

OrderForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    consumer: PropTypes.number.isRequired,
    provider: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
  })
};
