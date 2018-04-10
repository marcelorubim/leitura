import React, { Component } from 'react';
import Post from './Post'
import { Container } from 'semantic-ui-react';
import { fetchPostDetail } from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';



class PostDetail extends Component {
    componentDidMount() {
        const { postId,receivePostDetail } = this.props
        console.log(postId)
        receivePostDetail(postId);
    }
    render() {
        const post = this.props.post | {}
        return (

            <Container>
                <Post post={post} />
            </Container>
        )
    }

}

function mapStateToProps({postSelected},ownProps) {
    return {
        postId: ownProps.match.params.postId,
        post: postSelected
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receivePostDetail: (id) => dispatch(fetchPostDetail(id)),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));