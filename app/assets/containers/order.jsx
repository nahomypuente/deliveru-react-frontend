import React from 'react';
import axios from 'axios';
import OrderForm from '../presentational/order';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      order: {
        consumer:parseInt(localStorage.getItem("id")),
        provider: parseInt(this.props.match.params.id),
        items:[]
      },
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/items", {
        params: {
          /*El caso para que el proveedor pueda ver sus items*/
          provider: this.state.order.provider
        }
      }
      ).then(
        response => {
          console.log(response)
          let order = this.state.order
          let menu = response.data;
          console.log("menu");
          console.log(menu);
          menu.forEach (item => item["amount"] = 0);
          order.items = menu
          console.log(menu);
          this.setState({order, loading: false});
      }).catch(
        error => {
          console.log(error)
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

  handleChange(evt) {
    const target = evt.target;
    var order = this.state.order;
    order.items[parseInt(target.id)].amount = parseInt(target.value);
    console.log(order);
    this.setState({order: order});
  }

  handleSubmit(evt) {
    const order = this.state.order;
    const items = this.state.order.items;
    /*Filtro y me quedo con los items que tengan cantidad distinta a 0*/
    let items_filter = items.filter( item =>  item.amount != 0 );
    /*Recorro los items filtrados y actualizo los item con la cantidad de
    parametros solicitados*/
    items_filter = items_filter.map(
      item => item = {
        "id": item.id,
        "amount": item.amount
      }
    );
    order.items = items_filter;

    this.setState({order: order});
      this.setState({loading:true}, () => {
        axios
          .post('/api/orders',
            this.state.order
          ).then(
            response => {
              console.log(response);
              this.setState({ redirect: true });
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
          }).finally(()=>{
            this.setState({loading:false});
          });
      });
  }

  render() {
    return (
      <OrderForm loading={this.state.loading}
                 items={this.state.order.items}
                 redirect={this.state.redirect}
                 handleSubmit={this.handleSubmit}
                 handleChange={this.handleChange} />
    );
  }
}
