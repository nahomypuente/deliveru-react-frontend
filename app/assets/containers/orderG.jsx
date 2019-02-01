import React from 'react';
import axios from 'axios';
import OrderGForm from '../presentational/orderG';

export default class OrderG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
      isLoggedIn: false,
      redirect: true,
      /*id de order*/
      id: 0,
      isProvider: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitStatus = this.handleSubmitStatus.bind(this);
    this.handleSubmitDeleteO = this.handleSubmitDeleteO.bind(this);
  }

  componentDidMount () {
    axios
      .get("/api/orders",{
        params:{
          /*El caso para que el proveedor/consumidor pueda ver sus ordenes*/
          user_id: localStorage.getItem("id")}
      }).then(
        response => {
          console.log(response);
          console.log(response.data);
          if (localStorage.getItem("isLoggedIn") == 'true'){
            this.setState({ isLoggedIn: true, redirect:false });
          }
          if (localStorage.getItem("isProvider") == 'true'){
            this.setState({ isProvider: true });
          }
          this.setState({ orders: response.data, loading: false });
      }).catch(
        error => {
          console.log(error);
          if (!error.response)
            alert(error);
          else if (error.response.data && error.response.status !== 400 &&
                   error.response.status !== 404)
            alert(error.response.data);
          else
            alert(error.response.statusText);
          this.setState({ loading: false });
        }
      );
  }

  handleClick(id) {
    this.setState({
      id: parseInt(id)
    });
  }

  handleSubmitStatus(evt) {
    this.setState({ loading: true }, () => {
      axios
        .post('/api/deliver/' + this.state.id)
          .then(
            response => {
              console.log(response)
              window.location.reload();
          }).catch(
            error => {
              console.log(error);
              if (!error.response)
                alert(error);
              else if (error.response.data && error.response.status !== 404)
                alert(error.response.data);
              else
                alert(error.response.statusText);
          }).finally(() => {
              this.setState({ loading: false });
          });
    });
  }

  handleSubmitDeleteO(evt) {
    this.setState({ loading: true }, () => {
      axios
        .post('/api/orders/delete/' + this.state.id)
          .then(
             response => {
               console.log(response)
               window.location.reload();
          }).catch(
            error => {
              console.log(error);
              if (!error.response)
                alert(error);
              else if (error.response.data && error.response.status !== 404)
                alert(error.response.data);
              else
                alert(error.response.statusText);
          }).finally( () => {
            this.setState({ loading: false });
          });
    });
  }

/*
  componentDidUpdate(){
    if (this.state.id != 0) {
      axios
      .get("/api/orders",{
          params:{
              user_id: localStorage.getItem("id")}
          }
      )
      .then(
          response =>{
              console.log(response);
              console.log(response.data);
              if (localStorage.getItem("isLoggedIn") == 'true'){
                  this.setState({ isLoggedIn: true, redirect:false });
              }
              if (localStorage.getItem("isProvider") == 'true'){
                  this.setState({ isProvider: true });
              }
              this.setState({ orders: response.data, loading: false });
          }
      )
      .catch(
          error => {
              console.log(error);
              if (!error.response)
                  alert(error);
              else if (error.response.data && error.response.status !== 400 &&
                error.response.status !== 404)
                alert(error.response.data);
              else
                alert(error.response.statusText);
              this.setState({ loading: false });
          }
      );
    }
  }*/

  render() {
    return (
      <OrderGForm loading={this.state.loading}
                  orders={this.state.orders}
                  isLoggedIn={this.state.isLoggedIn}
                  isProvider={this.state.isProvider}
                  redirect={this.state.redirect}
                  id={this.state.id}
                  handleClick={this.handleClick}
                  handleSubmitStatus={this.handleSubmitStatus}
                  handleSubmitDeleteO={this.handleSubmitDeleteO}/>
    );
  }
}
