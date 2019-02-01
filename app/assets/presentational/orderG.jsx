import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Button, Form, NavbarBrand, Navbar, Nav, NavItem,
         NavLink } from 'reactstrap';

export default function OrderGForm(props) {
  let { loading, orders, orders_detail, isLoggedIn, redirect, handleClick,
        handleSubmitStatus, handleSubmitDeleteO, isProvider, id,
        handleDetailOrder } = props;

  if (loading) {
    return (
      <div className="body text-center my-3">
        <div className="fa-3x my-3">
        <i className="fas fa-spinner fa-spin"/>
        </div>
        <h4>Loading...</h4>
      </div>
    );
  }
  else {
    if (isLoggedIn){
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

          <div className="body">
            <div className="main-div">
              { isProvider ? (
                  <h1 className="display-3 text-center mb-5">
                    Mis pedidos como proveedor</h1>
                ) : (
                  <h1 className="display-3 text-center mb-5">
                    Mis pedidos como consumidor</h1>
                )
              }
              <ul>
                { orders.map((order, idx) => (
                  <div key={idx} className={order.id.toString()} >
                    { isProvider ? (
                        <div className="col-sm-8 offset-sm-2">
                          <h4 className="card-header">
                            <strong>
                              { order.consumer_email } :
                            </strong>
                            <strong>
                              $ { order.order_amount }
                            </strong>
                            <span className="float-right">
                              <span className="badge badge-primary">
                                {order.status}
                              </span>
                            </span>
                          </h4>
                          <div className="text-center col-sm-4 offset-sm-4">
                            <Form onSubmit={handleSubmitStatus}>
                              <button onClick={() => { handleClick(order.id) }}>
                                Cambiar Estado
                              </button>
                            </Form>
                          </div>
                        </div>
                      ) : (
                        <div className="col-sm-8 offset-sm-2">
                          <h4 className="card-header">
                            <strong>
                              { order.provider_name }:
                            </strong>
                            <strong>
                              $ { order.order_amount }
                            </strong>
                            <span className="float-right">
                              <span className="badge badge-primary">
                                { order.status }
                              </span>
                            </span>
                          </h4>
                          <div className="text-center col-sm-4 offset-sm-4">
                            <Form onSubmit={handleSubmitDeleteO}>
                              <button onClick={() => { handleClick(order.id) }}>
                                Delete
                              </button>
                            </Form>
                          </div>
                        </div>
                      )
                    }
                  </div>
                ))
                }
              </ul>
            </div>
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

OrderGForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};
