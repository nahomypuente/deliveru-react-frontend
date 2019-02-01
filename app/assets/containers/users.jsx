import React from 'react';
import axios from 'axios';
import UserForm from '../presentational/users';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      balance: 0,
      isProvider: false,
      isLoggedIn: false,
      redirect: true,
      id: 0,
      activeTab: '1',
    };
	this.toggle = this.toggle.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/' + parseInt(localStorage.getItem("id"))
      ).then(
        response =>{
          console.log(response);
          if (localStorage.getItem("isLoggedIn") == 'true'){
            this.setState({ isLoggedIn: true });
          }
          if (localStorage.getItem("isProvider") == 'true'){
            this.setState({ isProvider: true });
          }
          console.log(this.state.isLoggedIn);
          this.setState({
            redirect: false,
            email: response.data.email,
            balance: response.data.balance,
            id: parseInt(localStorage.getItem("id")),
            loading: false
          })
      }).catch(
        error => {
          console.log(error);
          if (!error.response)
            alert(error)
          else if (error.response.data && error.response.status !== 404
            && error.response.status !== 400)
            alert(error.response.data);
          else
            alert(error.response.statusText);
          this.setState({loading: false});
          }
      );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleSubmit(evt) {
      this.setState({loading:true}, () => {
        axios
          .post('/api/users/delete/' + parseInt(localStorage.getItem("id"))
          ).then(
            response => {
              console.log(response);
              console.log(this.state.id)
              this.setState({redirect: true})
          }).catch(
            error => {
              console.log(error);
              if (!error.response)
                alert(error);
              else if (error.response.data && error.response.status !== 404)
            	alert(error.response.data);
              else
                alert(error.response.statusText);
          }).finally(()=>{
            this.setState({loading:false});
          });
      });
  }

    handleSubmitLogout(){
    this.setState({ loading: true }, () => {
      axios
        .post('/api/logout',
          this.state.logout
        ).then(
          response => {
            console.log("logout");
            console.log(localStorage.getItem("isLoggedIn"));
            if ((localStorage.getItem("isLoggedIn")) == "true"){
              localStorage.clear();
              this.setState({redirect: true, isLoggedIn: false});
            }
            console.log(localStorage.getItem("isLoggedIn"))
        }).catch(
          error => {
            console.log(error);
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 404)
              alert(error.response.data);
            else
              alert(error.response.statusText);
        }).finally(()=>{
          this.setState({loading:false});
        });
      });
    }

  render() {
    return (
      <UserForm loading={this.state.loading}
                email={this.state.email}
                balance={this.state.balance}
                isProvider={this.state.isProvider}
                isLoggedIn={this.state.isLoggedIn}
                redirect={this.state.redirect}
                id={this.state.id}
                toggle={this.toggle}
                activeTab={this.state.activeTab}
                handleSubmit={this.handleSubmit}
                handleSubmitLogout={this.handleSubmitLogout}
                />
    );
  }
}
