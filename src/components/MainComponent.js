import React, { Component } from 'react';
import { Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuFunction'
import { DISHES } from '../shared/dishes' /*it is not in same dir. so you go one level up. hence '../'*/
import Detail from './DishDetailFunction'

class Main extends Component {

  constructor(props)
  {
    super(props)
    this.state=
    {
      dishes:DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishId) {

      this.setState({selectedDish: dishId});
    }
    
  render(){
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
         <NavbarBrand href="/">Restoranti Con Fusion </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={this.state.dishes}
        onClick={(dishId) => this.onDishSelect(dishId)}/>
      <Detail dish={this.state.dishes.filter((dish) => dish.id=== this.state.selectedDish)[0]}/>
    </div>
   );
  }
}

export default Main;
