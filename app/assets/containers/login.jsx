import React from 'react';
import axios from 'axios';
import LoginForm from '../presentational/login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      login: {email:'',password:''},
      /*Id sera solicitado para redirect en presentational*/
      id: 0,
      redirect: false,
      isProvider: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const target = evt.target;
    const login = this.state.login;
    console.log(login);

    login[target.name] = target.value
    console.log(login);
    this.setState({
      login:login
    });
  }

  handleSubmit(evt) {
    this.setState({loading:true}, () => {
      axios
        .post('/api/login',
          this.state.login
        ).then(
          response => {
            console.log(response);
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("isProvider",response.data.isProvider);
            localStorage.setItem("isLoggedIn",true);
            this.setState({
              id: response.data.id,
              redirect: true,
              isProvider: response.data.isProvider
            });
        }).catch(
          error => {
            console.log(error);
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 401 &&
                     error.response.status !== 403)
              alert(error.response.data);
            else
              alert(error.response.statusText);
        }).finally(()=> {
          this.setState({loading:false});
        });
    });
  }

  render() {
    return (
      <LoginForm loading={this.state.loading}
                 loging={this.state.login}
                 id={this.state.id}
                 isProvider={this.state.isProvider}
                 redirect={this.state.redirect}
                 handleSubmit={this.handleSubmit}
                 handleChange={this.handleChange}/>
    );
  }
}
