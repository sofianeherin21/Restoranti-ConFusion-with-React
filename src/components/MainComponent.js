import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterFunction'
import Menu from './MenuFunction'
import Home from './HomeComponent'
import { DISHES } from '../shared/dishes' /*it is not in same dir. so you go one level up. hence '../'*/
import Detail from './DishDetailFunction'
import { Switch, Route, Redirect } from 'react-router-dom'
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
      <Header/>
      <Menu dishes={this.state.dishes}
        onClick={(dishId) => this.onDishSelect(dishId)}/>
      <Detail dish={this.state.dishes.filter((dish) => dish.id=== this.state.selectedDish)[0]}/>
      <Footer/>
    </div>
   );
  }
}

export default Main;
