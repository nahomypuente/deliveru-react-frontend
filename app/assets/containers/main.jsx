import React from 'react';
import axios from 'axios';
import Home from '../presentational/home';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      isLoggedIn: false,
      isProvider: false,
      redirect: false,
      /*ID de algun proveedor solicitado en redirect*/
      id: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/locations")
      .then(
        response => {
          console.log(response)
          console.log(localStorage.getItem("isLoggedIn"))
          if (localStorage.getItem("isLoggedIn") == 'true') {
            this.setState({ isLoggedIn: true });
          }
          if (localStorage.getItem("isProvider") == 'true') {
            this.setState({ isProvider: true });
          }
          console.log(this.state.isLoggedIn)
          this.setState({locations: response.data, loading: false});
      }).catch(
        error => {
          console.log(error)
          if (!error.response)
            alert(error);
          else if (error.response.data && error.response.status !== 404)
            alert(error.response.data)
          else
            alert(error.response.statusText);
          this.setState({ loading: false });
        }
      );
  }

  handleClick(id) {
    console.log(id)
    this.setState ({
      id: parseInt(id)
    });
  }

  handleSubmit(evt) {
    console.log(this.state.id)
    this.setState({ loading: true }, () => {
      this.setState({ redirect: true, loading: false });
    });
  }

  handleSubmitLogout() {
    this.setState({ loading: true }, () => {
      axios
        .post('/api/logout',
          this.state.logout)
        .then(
          response => {
            console.log(response)
            if ((localStorage.getItem("isLoggedIn")) == "true"){
              localStorage.clear();
              this.setState({ isLoggedIn: false });
            }
          }
        ).catch(
          error => {
            console.log(error);
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 404)
              alert(error.response.data)
            else
              alert(error.response.statusText);
        }).finally(()=>{
          this.setState({ loading: false });
        });
    });
  }

  render() {
    return (
      <Home loading={this.state.loading}
            locations={this.state.locations}
            handleSubmit={this.handleSubmit}
            handleSubmitLogout={this.handleSubmitLogout}
            handleClick={this.handleClick}
            redirect={this.state.redirect}
            isLoggedIn={this.state.isLoggedIn}
            isProvider={this.state.isProvider}
            id={this.state.id}/>
    );
  }
}
