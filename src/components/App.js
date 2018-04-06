import React, { Component } from 'react';
import { Menu, Button, Container, Divider, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { Link } from 'react-router-dom'
import ListPost from './ListPost'

class App extends Component {
  state = {
    sortBy: 'voteScore'
  }
  sortBy = (e, { value }) => {
    this.setState({ sortBy: value })
  }
  componentDidMount() {
    const { receiveCategories, receivePosts } = this.props;
    receiveCategories();
    receivePosts();
  }
  render() {
    const { categories, activeCategory } = this.props;
    const orderOptions = [
      { key: 'v', text: 'Score', value: 'voteScore' },
      { key: 't', text: 'Date', value: 'timestamp' },
    ]
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item active={typeof activeCategory === 'undefined'}>
              <Link to='/' >All</Link>
            </Menu.Item>
            {categories.map((c, index) =>
              <Menu.Item key={index} active={activeCategory === c.name}>
                <Link to={c.path}>{c.name}</Link>
              </Menu.Item>
            )}
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button size='mini' primary>New Post</Button>
              </Menu.Item>
              <Menu.Item>
                <Form.Select options={orderOptions} onChange={this.sortBy} placeholder='Order By' orderBy={this.state.sortBy} />
              </Menu.Item>

            </Menu.Menu>
          </Container>
        </Menu>
        <Container>
          <Divider />


          <ListPost activeCategory={activeCategory} orderBy={this.state.sortBy} />
        </Container>
      </div>
    );
  }
}
function mapStateToProps({ categories, posts, activeCategory }, ownProps) {
  return {
    categories,
    posts,
    activeCategory: ownProps.match.params.activeCategory
  }
}
function mapDispatchToProps(dispatch) {
  return {
    receiveCategories: () => dispatch(fetchCategories()),
    receivePosts: () => dispatch(fetchPosts()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
