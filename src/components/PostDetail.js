import React, { Component } from 'react';
import Post from './Post'
import { Container, Button, Icon, Divider } from 'semantic-ui-react';
import { fetchPostDetail, selectCategory, fetchComments, sendVotePost } from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ListComments from './ListComments';



class PostDetail extends Component {
    sendVote = (e, option) => {
        const { postId, registerVotePost } = this.props
        registerVotePost(postId, { option })
    }
    componentDidMount() {
        const { postId, receivePostDetail, changeCategory, receiveComments } = this.props
        receivePostDetail(postId);
        receiveComments(postId);
        changeCategory(null);
    }
    render() {
        const { comments, history } = this.props
        const post = this.props.post || {}
        console.log(comments)
        return (

            <Container>


                <Post post={post} />
                <Divider />

                <Container>
                    <Button primary onClick={(e) => history.goBack()}><Icon name='left arrow' />Back</Button>
                    <Button.Group floated='right'>
                        <Button primary icon >
                            <Icon name='thumbs up' onClick={(e) => this.sendVote(e, 'upVote')} />
                        </Button>
                        <Button primary icon>
                            <Icon name='thumbs down' onClick={(e) => this.sendVote(e, 'downVote')} />
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

function mapStateToProps({ posts }, { match, history }) {
    return {
        history,
        postId: match.params.postId,
        post: posts[match.params.postId],
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receivePostDetail: (postId) => dispatch(fetchPostDetail(postId)),
        changeCategory: (c) => dispatch(selectCategory(c)),
        receiveComments: (postId) => dispatch(fetchComments(postId)),
        registerVotePost: (postId, option) => dispatch(sendVotePost(postId, option))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));