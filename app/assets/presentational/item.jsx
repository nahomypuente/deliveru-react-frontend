import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Form, InputGroup, InputGroupAddon, Input, FormGroup, Col, Row,
	     InputGroupText, Nav, NavItem, NavLink, Navbar,
	     NavbarBrand } from 'reactstrap';

export default function ItemForm(props) {
  let { loading, handleSubmitItem, handleChange, handleClickDelete, item, itemsGet,
        isProvider, id } = props;

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
    if (isProvider) {
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
          <h1 className="display-3 text-center mb-5">Menú</h1>
          <Row>
            <Col xs="9" md={{ size: 8, offset: 2 }}>
              { itemsGet.map((items, idx) => (
                <div key={idx}
                  className={items.id.toString()}>
                  <InputGroupAddon addonType="prepend">
                    <Button color="danger"
                      onClick={ () => { handleClickDelete(items.id) }}>
                      <b>x</b>
                    </Button>
                    <InputGroupText>{ items.name }</InputGroupText>
                    <InputGroupText>$ { items.price }</InputGroupText>
                  </InputGroupAddon>
                </div>
                ))
              }
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="9" md={{ size: 8, offset: 2 }}>
              <Form onSubmit={ handleSubmitItem }>
                <FormGroup>
                  <InputGroupAddon addonType="append">
                    <Button color="success">
                      <b>+</b>
                    </Button>
                    <Input type="text" name="name" value={ item.name }
											onChange={handleChange}/>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input type="number" name="price" value={ item.price }
                      step="0.5" onChange={ handleChange }/>
                  </InputGroupAddon>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <h5>Iniciá sesión como proveedor</h5>
      </div>
    );
  }
}

ItemForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  itemsGet: PropTypes.array.isRequired,
  item:PropTypes.shape ({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    provider: PropTypes.number.isRequired
  }),
  isProvider: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};
