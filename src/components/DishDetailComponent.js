import React, {Component} from 'react';
import {Card, CardText,CardBody,CardImg,CardTitle} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

class Detail extends Component{

	

	componentDidMount(){
     	console.log('DishDetail component componentDidMount invoked');
     } 
     componentDidUpdate(){
     	console.log('DishDetail component componentDidUpdate invoked');
     } 

	renderDish(dish)
	{
		console.log('DishDetail component render invoked');

		if(dish!=null)
		{
			return(

				<Card>
					<CardImg top src={baseUrl + dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
				);
		}
		else{
			return(
				<div></div>);
		}
	}

	renderComment(dish)
	{
		if(dish!=null && dish.comments!=null)
		{
			const reviews= dish.comments.map((review)=>
			{
				return(
					<div key={review.id}>
						<li> 
							<p>{review.comment}</p>
							<p>{review.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</p>
						</li>

					</div>
					);
			});
			
			return(
				<ul className="list-unstyled">
					<h4>Comments</h4>
					{reviews}
				</ul>
				
			);

		}
		else{
			return(
				<div></div>);
		}
	}

	render(){
		return(

			<div className="container">

				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.dish)}
					</div>
					<div className="col-12 col-md-5 m-1">

						{this.renderComment(this.props.dish)}
					</div>

				</div>
			</div>);
	}
} 

export default Detail;