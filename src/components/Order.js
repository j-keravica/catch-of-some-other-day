import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrderItems = this.renderOrderItems.bind(this);
  }

  renderOrderItems(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

    if(!fish || fish.status === 'unavailable') {
      return(
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available.
          {removeButton}
        </li>
      );
    }

    return(
      <li key={key}>
        <span>{count}lbs {fish.name} {removeButton}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const count = order[key];
      const fish = fishes[key];
      if (fish && fish.status === 'available') {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);
    return(
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrderItems)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;
