import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectCategory, fetchPosts } from '../actions'
import sortBy from 'sort-by';
import { Form, Container,Segment } from 'semantic-ui-react'




class ListPost extends Component {
    state = {
        orderBy: 'voteScore'
    }
    sortBy = (e, { value }) => {
        console.log(value)
        this.setState({ orderBy: value });
    }
    componentDidUpdate(prevProps) {
        const { changeCategory, activeCategory } = this.props;
        if (activeCategory !== prevProps.activeCategory || activeCategory===null){
            changeCategory(activeCategory);
        }
    }
    componentDidMount() {
        const { activeCategory, changeCategory,receivePosts } = this.props;
        changeCategory(activeCategory);
        receivePosts();
      }
    render() {
        const { posts, activeCategory } = this.props
        const { orderBy } = this.state
        const postsCategory = posts.sort(sortBy(`-${orderBy}`)).filter(p => !p.deleted).filter(p => !activeCategory || p.category === activeCategory);
        const orderOptions = [
            { key: 'v', text: 'Score', value: 'voteScore' },
            { key: 't', text: 'Date', value: 'timestamp' },
        ]
        return (
            <Container>
                <Container textAlign='right'>
                    {postsCategory.length > 0 &&
                        <Form>
                            <Form.Select inline options={orderOptions} onChange={this.sortBy} placeholder='Order By' value={orderBy} label='Order By: ' />
                        </Form>
                    }
                </Container>
                {postsCategory.map(p =>
                    <Segment.Group key={p.id}>
                        <Segment>
                            <Post key={p.id} post={p}/>
                        </Segment>                        
                    </Segment.Group>
                )}
            </Container>
        )
    }
}
function mapStateToProps({ posts }, { match }) {
    return {
        posts: Object.keys(posts).map((key) => posts[key]),
        activeCategory: match.params.activeCategory
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCategory: (c) => dispatch(selectCategory(c)),
        receivePosts: () => dispatch(fetchPosts()),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPost))