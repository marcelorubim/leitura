import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Comment, Segment, Button, Form,Label} from 'semantic-ui-react';
import uuid from 'uuid'
import { fetchComments, insertComment,sendCommentVote,deleteComment } from '../actions'
import { withRouter } from 'react-router-dom'


class ListComments extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const { postId, addComment } = this.props
        const form = e.target;
        const data = new FormData(form);
        const newComment = {
            id: uuid.v1(),
            author: data.get('author'),
            body: data.get('body'),
            timestamp: new Date().getTime(),
            parentId: postId
        }
        console.log(newComment)
        addComment(newComment)
        e.target.reset();
    }
    sendVote = (e, commentId,option) => {
        const { registerCommentVote } = this.props
        registerCommentVote(commentId, { option })
    }
    deleteComment = (e, commentId) => {
        const { deleteComment } = this.props
        deleteComment(commentId)
    }
    render() {
        const { comments } = this.props
        return (
            <div style={{ marginTop: '3rem' }}>
                <h4>Comments</h4>
                <Segment>
                    <Comment.Group>
                        {comments.map(c => (
                            <Comment key={c.id}>
                                <Comment.Content>
                                    <Comment.Author as='a'>{c.author}</Comment.Author>
                                    <Comment.Metadata>                                    
                                        <div>{new Date(c.timestamp).toLocaleDateString()} {new Date(c.timestamp).toLocaleTimeString()}</div>
                                        <Label color='grey' circular>{c.voteScore}</Label>
                                    </Comment.Metadata>
                                    <Comment.Text>{c.body}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={(e) => this.sendVote(e,c.id, 'upVote')}>Like</Comment.Action>
                                        <Comment.Action onClick={(e) => this.sendVote(e,c.id, 'downVote')}>Dislike</Comment.Action>
                                        <Comment.Action onClick={(e) => this.deleteComment(e,c.id)}>Delete</Comment.Action>

                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))
                        }
                    </Comment.Group>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.Input label='Your Name' placeholder='Your Name' name='author' />
                        <Form.TextArea label='Comment' placeholder='Comment' name='body' />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Segment>
            </div>
        )
    }
}
function mapStateToProps({ comments,posts }, { match }) {
    return {
        comments: Object.keys(comments).map((key) => comments[key]).filter((c) => c.parentId === match.params.postId && !c.deleted),
        postId: match.params.postId,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receiveComments: (postId) => dispatch(fetchComments(postId)),
        addComment: (comment) => dispatch(insertComment(comment)),
        registerCommentVote: (commentId,option) => dispatch(sendCommentVote(commentId,option)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))