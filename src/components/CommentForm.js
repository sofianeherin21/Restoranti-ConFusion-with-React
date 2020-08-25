import React, { Component } from  'react';
import { Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


class CommentForm extends Component{


	constructor(props) {
        super(props);
    
        

        this.state = {
            author:'',
            rating:'',
            comment:'',
            touched: {
                author: false,
                rating: false,
                comment: false
              },

            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

      }

      

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const author = target.author;
    
        this.setState({
	          [author]: value
	        });
	    }

	  handleSubmit(values) {
	        console.log('Current State is: ' + JSON.stringify(values));
	        
	        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	        // event.preventDefault();
	    }

	  handleBlur = (field) => (evt) => {
	    this.setState({
	      touched: { ...this.state.touched, [field]: true },
	    });
	  }

	  validate(author)
	    {
	        const errors = {

	            author: ''

	        };

	        if(this.state.touched.author && author.length < 2)
	        
	            errors.author = 'name should be >=2 characters';
	        
	        else if(this.state.touched.author && author.length > 15)
	        
	            errors.author = 'name should be <=15 characters';
	        

	                return errors;
	    }

      

	render(){
		const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
		return(


			<React.Fragment>

				<Button onClick={this.toggleModal} className="btn btn-default">Submit Comment</Button>
				 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                             <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                             </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    
                    </ModalBody>
                </Modal>



			</React.Fragment>




			);
	}
}


export default CommentForm;