import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, TabContent, TabPane, Nav, NavItem, NavLink, Navbar,
        NavbarBrand} from 'reactstrap';
import classnames from 'classnames';export default function UserForm(props) {
 let { loading, email, balance, isProvider, id, redirect,
       activeTab, toggle, handleSubmit, handleSubmitLogout,
       isLoggedIn } = props;  if (loading) {
   return (
     <div className="body text-center my-3">
       <div className="fa-3x my-3">
       <i className="fas fa-spinner fa-spin"/>
       </div>
       <h4>Loading...</h4>
     </div>
   );
 } else {
   if (isLoggedIn) {
     return (
       <div>
         <Navbar color="primary" light expand="sm">
           <NavbarBrand href="/"
           >Deliveru</NavbarBrand>
             <Nav className="ml-auto" navbar>
               <NavItem>
                 <NavLink href="/profile">Perfil</NavLink>
               </NavItem>
               <NavItem>
                 <Form onSubmit={handleSubmitLogout}>
                   <Button>Cerrar Sesion</Button>
                 </Form>
               </NavItem>

             </Nav>
           </Navbar><h1 className="display-3 text-center mb-5">
           Perfil del Usuario</h1><Nav tabs>
           <NavItem>
             <NavLink
               className={classnames({ active: activeTab === '1' })}
               onClick={() => { toggle('1'); }} >
               Datos de la cuenta
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink
               className={classnames({ active: activeTab === '2' })}
               onClick={() => { toggle('2'); }} >
               Pedidos
             </NavLink>
           </NavItem>
           { isProvider ? (
             <NavItem>
               <NavLink
                 className={classnames({ active: activeTab === '3' })}
                 onClick={() => { toggle('3'); }} >
                 Menu
               </NavLink>
             </NavItem>
             ) : ("")
           }
         </Nav><TabContent activeTab={activeTab}>
           <TabPane tabId="1">
             <li> Email: {email} </li>
             <li> Balance: ${balance} </li>
             <form onSubmit={handleSubmit}>
               <button> borrar usuario</button>
               { redirect && (<Redirect to={"/login"}/>) }
             </form>
           </TabPane>
           <TabPane tabId="2">
             <ul>
               <Link to={'/orders'}>Pedidos</Link>
             </ul>
           </TabPane>
          { isProvider ? (
             <TabPane tabId="3">
               <ul>
                 <Link to={'/items'}>Items</Link>
               </ul>
             </TabPane>
             ) : ("")
           }
         </TabContent>
       </div>
     );
   }
   return (
     <div>
       {redirect && (<Redirect to={"/login"}/>)}
     </div>
   );
 }
}UserForm.propTypes = {
 loading: PropTypes.bool.isRequired,
 isProvider: PropTypes.bool.isRequired,
 isLoggedIn: PropTypes.bool.isRequired,
 email: PropTypes.string.isRequired,
 balance: PropTypes.number.isRequired,
 redirect: PropTypes.bool.isRequired,
 id: PropTypes.number.isRequired,
 activeTab: PropTypes.string.isRequired,
};
