import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentsModal extends Component {
  state = {
    touched: {
      author: false,
    },
  };

  handleSubmit = (values) => {
    // console.log(this.props)
    // console.log(this.props.campsiteId)

    this.props.toggle();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <div className='form-group'>
              <Label htmlFor='rating'>Rating</Label>
              <Control.select
                model='.rating'
                id='rating'
                name='rating'
                defaultValue='1'
                className='form-control'
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </div>
            <div className='form-group'>
              <Label htmlFor='author'>Your Name</Label>
              <Control.text
                model='.author'
                id='author'
                name='author'
                placeholder='Author'
                className='form-control'
                validators={{
                  required,
                  minLength: minLength(2),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className='text-danger'
                model='.author'
                show='touched'
                component='div'
                messages={{
                  required: 'Required',
                  minLength: 'Must be at least 2 characters',
                  maxLength: 'Must be 15 characters or less',
                }}
              />
            </div>
            <div className='form-group'>
              <Label htmlFor='text'>Comment</Label>
              <Control.textarea
                model='.text'
                id='text'
                name='text'
                rows='6'
                className='form-control'
              />
            </div>
            <Button color='primary'>Submit</Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

export default CommentsModal;
