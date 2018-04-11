import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Comment, Segment, Button, Icon, Divider,Form } from 'semantic-ui-react';
import uuid from 'uuid'
import {addComment} from '../api'
import {fetchComments} from '../actions'


class ListComments extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const {postSelected,receiveComments} = this.props
        const form = e.target;
        const data = new FormData(form);
        const newComment = {
            id:uuid.v1(),
            author:data.get('author'),
            body:data.get('body'),
            timestamp:new Date().getTime(),
            parentId:postSelected.id
        }
        console.log(newComment)
        addComment(newComment)
        receiveComments(postSelected.id);

        e.target.reset();

    }
    render() {
        const { comments } = this.props
        return (
            <div style={{'margin-top':'3rem'}}>
                <h4>Comments</h4>
                <Segment>
                    <Comment.Group>
                        {comments.map(c => (
                            <Comment>
                                <Comment.Content>
                                    <Comment.Author as='a'>{c.author}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{new Date(c.timestamp).toLocaleDateString()} {new Date(c.timestamp).toLocaleTimeString()}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{c.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))
                        }
                    </Comment.Group>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.Input label='Your Name' placeholder='Your Name' name='author' />
                        <Form.TextArea label='Comment' placeholder='Comment'  name='body' />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Segment>
            </div>
        )
    }
}
function mapStateToProps({ comments,postSelected }) {
    return {
        comments,
        postSelected
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receiveComments: (postId) => dispatch(fetchComments(postId))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListComments)