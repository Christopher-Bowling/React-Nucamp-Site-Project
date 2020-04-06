import React, { Component, Fragment } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentsModal from './CommentsModal/CommentsModal';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.commentsToggleHandler = this.commentsToggleHandler.bind(this);
  }

  commentsToggleHandler() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Fragment>
        <Button outline onClick={this.commentsToggleHandler}>
          <i className='fa fa-pencil fa-lg' /> Submit Comment
        </Button>
        {/* { this.state.isOpen ?  */}
        <CommentsModal
          isOpen={this.state.isOpen}
          toggle={this.commentsToggleHandler}
          campsiteId={this.props.campsiteId}
          postComment={this.props.postComment}
        />
        {/* : null} */}
      </Fragment>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className='col-md-5 m-1'>
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, postComment, campsiteId }) {
  console.log(postComment);
  return (
    <div className='col-md-5 m-1'>
      <h4>Comments</h4>
      {comments && (
        <div>
          {comments.map((comment) => {
            return (
              <div className='col'>
                <div>
                  <div className='row'>{comment.text}</div>
                  <div className='row mb-3'>
                    {`--${comment.author}, `}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(Date.parse(comment.date)))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <CommentForm campsiteId={campsiteId} postComment={postComment} />
    </div>
  );

  // return <div></div>;
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to='/directory'>Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;
