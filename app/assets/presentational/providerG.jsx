import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Button, Col, Row, Navbar, NavbarBrand } from 'reactstrap';

export default function ProviderGForm(props) {
  let { loading, providers, isLoggedIn, redirect } = props;

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
    if(isLoggedIn){
      let delivery = providers.map((menu) => {
        return (
          <Link to={'/menu/' + menu.id} key={menu.id}
          className="list-group-item">{menu.store_name}</Link>
        );
      });
      return (
        <div className="body">
          <Navbar color="primary" light expand="sm">
            <NavbarBrand href="/">Deliveru</NavbarBrand>
          </Navbar>
            <h1 className="display-3 text-center mb-5">
              Elegi tu delivery!</h1>
            <div>
              {providers.length ?
                (<div>
                  <Row>
                    <Col xs="9" md={{ size: 8, offset: 2 }}>
                      {delivery}
                    </Col>
                  </Row>
                </div>) :
                (<h3 className="text-center mb-5">
                  Lo sentimos. No hay deliveries en tu zona.</h3>)
              }
            </div>
        </div>
      );
    }
    return (
      <div>
        {redirect && (<Redirect to={"/login"}/>)}
      </div>
    )
  }
}

ProviderGForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  providers: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired
};
