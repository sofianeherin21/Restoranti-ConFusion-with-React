import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row,Col,Button } from 'reactstrap';
import {Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



function RenderDish({dish})
{


		console.log('DishDetail component render invoked');

		
        
		if(dish != null)
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

	function RenderComment({comments, postComment, dishId})
	{
		if(comments!=null)
		{
			const reviews= comments.map((review)=>
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
					<CommentForm dishId={dishId} postComment={postComment}/>
				</ul>
				
			);

		}
		else{
			return(
				<div></div>);
		}
	}

	const Detail = (props) =>{
		if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null)
		{
			return(

			<div className="container">
				<div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>

				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish = {props.dish}/>
					</div>
					<div className="col-12 col-md-5 m-1">

						<RenderComment comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
					</div>

				</div>
			</div>);
		}
	}
 

export default Detail;