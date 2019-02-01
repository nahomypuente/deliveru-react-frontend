import React from 'react';
import axios from 'axios';
import ProviderGForm from '../presentational/providerG';

export default class ProviderG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      providers: [],
      isLoggedIn: false,
      redirect: true
    };
  }

  componentDidMount() {
    const id  = this.props.match.params.id
    axios
      .get('/api/providers', {
        params:{
          location: id
        }
      })
      .then(
        response =>{
          console.log(response);
          console.log(response.data);
          if (localStorage.getItem("isLoggedIn") == 'true'){
            this.setState({ isLoggedIn: true, redirect: false});
          }
          this.setState({providers: response.data, loading: false});
      }).catch(
        error => {
          if (!error.response)
            alert(error);
          else if (error.response.data && error.response.status !== 400 &&
                   error.response.status !== 409 &&
                   error.response.status != 404)
            alert(error.response.data);
          else
            alert(error.response.statusText);
          this.setState({loading: false});
        }
      );
  }

  render() {
    return (
     <ProviderGForm loading={this.state.loading}
                    providers={this.state.providers}
                    isLoggedIn={this.state.isLoggedIn}
                    redirect={this.state.redirect}/>
    );
  }
}
