import React from 'react';
import axios from 'axios';
import SignUpForm from '../presentational/signup';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      providers: {
        email: '',
        location: 0,
        password: '',
        store_name: '',
        max_delivery_distance: 0
      },
      consumers: {
        email: '',
        location: 0,
        password: ''
      },
      locations: [],
      redirect: false,
      activeTab: '1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/locations")
        .then(
          response => {
            console.log(response)
            console.log(response.data)
            this.setState({ locations: response.data, loading: false });
        }).catch(
          error => {
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 404)
              alert(error.response.data);
            else
              alert(error.response.statusText);
            this.setState({ loading: false });
          }
        );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    console.log(tab);
    console.log(this.state.activeTab)
  }

  handleChange(evt) {
    const target = evt.target;
    if (this.state.activeTab == 1) {
      const consumers = this.state.consumers;
      console.log(consumers);
      consumers[target.name] = target.value
      console.log(consumers);
      this.setState({consumers:consumers});
    }
    else {
      const providers = this.state.providers;
      console.log(providers);
      if ( target.name == "max_delivery_distance" ){
        providers[target.name] = parseFloat(target.value)
      }
      else {
        providers[target.name] = target.value
      }
      console.log(providers);
      this.setState({providers:providers});
    }
  }

  handleClick(id_location){
    if (this.state.activeTab == '1'){
      console.log(this.state.activeTab);
      const consumers = this.state.consumers;
      consumers["location"] = parseInt(id_location);
      this.setState({ consumers: consumers });
      console.log(this.state.consumers);
    }
    else {
      console.log(this.state.activeTab)
      const providers = this.state.providers;
      providers["location"] = parseInt(id_location);
      this.setState({ providers: providers });
      console.log(this.state.providers);
    }
  }

  handleSubmit(evt) {
    if (this.state.activeTab == '1') {
      this.setState({ loading: true }, () => {
        axios
          .post('/api/consumers', this.state.consumers)
            .then(
              response => {
                console.log(response);
                console.log(response.data);
                console.log("dentro de las excepciones")
                this.setState({ redirect: true });
            }).catch(
              error => {
                console.log(error);
                if (!error.response)
                  alert(error);
                else if (error.response.data && error.response.status !== 400 &&
                         error.response.status !== 409 &&
                         error.response.status !== 404)
                  alert(error.response.data);
                else
                  alert(error.response.statusText);
              }
          )
          .finally(()=>{
            this.setState({ loading: false });
          }
        );
      });
    }
    else {
      this.setState({ loading: true }, () => {
        axios
          .post('/api/providers',
            this.state.providers
          ).then(
            response => {
              console.log(response);
              this.setState({ redirect: true });
          })
          .catch(
            error => {
            console.log(error);
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 400 &&
              error.response.status !== 409)
              alert(error.response.data);
            else
              alert(error.response.statusText);
            }
          ).finally(()=>{
            this.setState({ loading: false });
          });
        }
      );
    }
  }

  render() {
    return (
      <SignUpForm loading={this.state.loading}
            redirect={this.state.redirect}
            providers={this.state.providers}
            consumers={this.state.consumers}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            toggle={this.toggle}
            locations={this.state.locations}
            activeTab={this.state.activeTab}
          />
    );
  }
}
