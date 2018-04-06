import React, { Component } from 'react';
import { Menu, Button, Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { Link } from 'react-router-dom'
import ListPost from './ListPost'

class App extends Component {
  componentDidMount() {
    const { receiveCategories, receivePosts } = this.props;
    receiveCategories();
    receivePosts();
  }
  render() {
    const { categories, activeCategory } = this.props;
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item active={typeof activeCategory === 'undefined'}>
                <Link to='/' >All</Link>
            </Menu.Item>
            {categories.map((c,index) =>
              <Menu.Item key={index} active={activeCategory === c.name}>
                <Link to={c.path}>{c.name}</Link>
              </Menu.Item>
            )}
          </Container>
        </Menu>
        <Container>
          <Button size='mini' basic color='blue'>New Post</Button>
          <Divider />
          <ListPost activeCategory={activeCategory}/>          
        </Container>
      </div>
    );
  }
}
function mapStateToProps({ categories, posts, activeCategory },ownProps) {
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
