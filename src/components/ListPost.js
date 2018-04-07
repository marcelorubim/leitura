import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectCategory } from '../actions'
import sortBy from 'sort-by';
import { Form, Container } from 'semantic-ui-react';




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
        if (activeCategory !== prevProps.activeCategory) {
            changeCategory(activeCategory);
        }
    }
    render() {
        const { posts, activeCategory } = this.props
        const { orderBy } = this.state
        const orderOptions = [
            { key: 'v', text: 'Score', value: 'voteScore' },
            { key: 't', text: 'Date', value: 'timestamp' },
        ]
        return (
            <Container>
                <Container textAlign='right'>
                    <Form>
                        <Form.Select inline options={orderOptions} onChange={this.sortBy} placeholder='Order By' value={orderBy} label='Order By: ' />
                    </Form>
                </Container>

                {posts.sort(sortBy(orderBy)).filter(p => !p.deleted).filter(p => !activeCategory || p.category === activeCategory).map(p =>
                    <Post key={p.id} post={p} />
                )}
            </Container>
        )
    }
}
function mapStateToProps({ posts }, { match }) {
    return {
        posts: posts,
        activeCategory: match.params.activeCategory
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCategory: (c) => dispatch(selectCategory(c))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPost))