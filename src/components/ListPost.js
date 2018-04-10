import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom'
import { selectCategory } from '../actions'
import sortBy from 'sort-by';
import { Form, Container,Segment,Button } from 'semantic-ui-react';




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
        const postsCategory = posts.sort(sortBy(orderBy)).filter(p => !p.deleted).filter(p => !activeCategory || p.category === activeCategory);
        const { orderBy } = this.state
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
                         &nbsp;   
                        <Link to={`/postDetail/${p.id}`}><Button floated='right' size='mini' basic color='blue'>Detail</Button></Link>
                        </Segment>
                        <Segment>
                            <Post post={p} />
                        </Segment>
                    </Segment.Group>
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