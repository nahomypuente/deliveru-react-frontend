import React from 'react';
import axios from 'axios';
import ItemForm from '../presentational/item';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      item: {
        name: '',
        price: 0,
        provider: parseInt(localStorage.getItem("id"))
      },
      itemsGet:[],
      isProvider: false,
      /*Id de algun item*/
      id: 0
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitItem = this.handleSubmitItem.bind(this);
  }

  componentDidMount() {
    axios
      .get ("/api/items", {
        params: {
          /*El caso para que el proveedor pueda ver sus items*/
          provider: this.state.item.provider
        }
      })
      .then(
        response => {
          console.log(response)
          if (localStorage.getItem("isProvider") == 'true') {
            this.setState({isProvider: true});
          }
          this.setState({
            itemsGet: response.data,
            loading: false
          });
          console.log(this.state.itemsGet)
      }).catch(
        error => {
          console.log(error)
          if (!error.response)
            alert(error);
          else if (error.response.data && error.response.status !== 404 &&
                   error.response.status !== 405 &&
                   error.response.status !== 400)
            alert(error.response.data);
          else
            alert(error.response.statusText);
            this.setState({ loading: false });
        }
      );
  }

  handleClickDelete(id_item) {
    this.setState({loading:true}, () => {
      axios
        .post ('/api/items/delete/' + parseInt(id_item))
        .then(
          response => {
            console.log(response);
            this.setState({
              id: parseInt(id_item)
            });
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
        }).finally(()=>{
          this.setState({loading:false});
        });
    });
  }

  handleChange(evt) {
    const target = evt.target;
    const item = this.state.item;
    console.log(item);
    if (target.name == "price") {
      item[target.name] = parseFloat(target.value);
    } else {
      item[target.name] = target.value
    }
    console.log(item);
    this.setState({item:item});
  }

  handleSubmitItem(evt) {
    this.setState({loading:true}, () => {
      axios
        .post('/api/items',
          this.state.item
        ).then(
          response => {
            console.log(response);
            console.log(response.data);
            window.location.reload();
        }).catch(
          error => {
            console.log(error);
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 400 &&
                     error.response.status !== 404 &&
                     error.response.status !== 409)
              alert(error.response.data);
            else
              alert(error.response.statusText);
        }).finally(()=>{
          this.setState({loading:false});
        });
    });
  }

/*
  componentDidUpdate(){
    if (this.state.id != 0){
      axios
      .get ("/api/items", {
        params:{
          provider: this.state.item.provider
        }
      })
      .then(
        response =>{
          console.log(response)
          if (localStorage.getItem("isProvider") == 'true') {
            this.setState({isProvider: true});
          }
          this.setState({
            itemsGet: response.data,
            loading: false,
            id : 0
          });
          console.log(this.state.itemsGet)
        })
        .catch(
          error => {
            console.log(error)
            if (!error.response)
              alert(error);
            else if (error.response.data && error.response.status !== 404
              && error.response.status !== 405 && error.response.status !== 400)
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
      <ItemForm loading={this.state.loading}
                item={this.state.item}
                itemsGet={this.state.itemsGet}
                isProvider={this.state.isProvider}
                id={this.state.id}
                handleClickDelete={this.handleClickDelete}
                handleChange={this.handleChange}
                handleSubmitItem={this.handleSubmitItem}/>
    );
  }
}
