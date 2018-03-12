import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderEditForms = this.renderEditForms.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const newFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, newFish);
  }

  renderEditForms(key) {
    const fish = this.props.fishes[key];
    return(
      <div className="fish-edit" key={key}>
        <input onChange={(e) => this.handleChange(e, key)} type="text"  name="name" value={fish.name} placeholder="Fish Name" />
        <input onChange={(e) => this.handleChange(e, key)} type="text" name="price" value={fish.price} placeholder="Fish Price" />
        <select onChange={(e) => this.handleChange(e, key)} name="status" value={fish.status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea onChange={(e) => this.handleChange(e, key)} name="desc" value={fish.desc} placeholder="Fish Desc"></textarea>
        <input onChange={(e) => this.handleChange(e, key)} type="text" name="image" value={fish.image} placeholder="Fish Image" />
      </div>
    )
  }

  render() {
    return(
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderEditForms)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }
}

export default Inventory;
