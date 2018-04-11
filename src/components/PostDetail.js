import React, { Component } from 'react';
import Post from './Post'
import { Container, Comment, Segment, Button, Icon, Divider,Form } from 'semantic-ui-react';
import { fetchPostDetail, selectCategory, fetchComments } from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment } from '../api'
import ListComments from './ListComments';



class PostDetail extends Component {
    handleSubmit = (e) => {
        console.log(e.target);
    }
    componentDidMount() {
        const { postId, receivePostDetail, changeCategory, receiveComments } = this.props
        console.log(postId)
        receivePostDetail(postId);
        receiveComments(postId);
        changeCategory(null);
    }
    render() {
        const { post, comments, history } = this.props  
        console.log(comments)
        return (

            <Container>


                <Post post={post} />
                <Divider />

                <Container>
                    <Button primary onClick={(e) => history.goBack()}><Icon name='left arrow' />Back</Button>
                    <Button.Group floated='right'>
                        <Button primary icon >
                            <Icon name='thumbs up' />
                        </Button>
                        <Button primary icon>
                            <Icon name='thumbs down' />
                        </Button>
                        <Button primary icon>
                            <Icon name='trash' />
                        </Button>
                    </Button.Group>
                </Container>
                <ListComments />
            </Container >
        )
    }

}

function mapStateToProps({ postSelected, comments }, { match, history }) {
    return {
        history,
        postId: match.params.postId,
        post: postSelected,
        comments
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receivePostDetail: (postId) => dispatch(fetchPostDetail(postId)),
        changeCategory: (c) => dispatch(selectCategory(c)),
        receiveComments: (postId) => dispatch(fetchComments(postId))

    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));