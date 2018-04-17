import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ModalPost from './ModalPost'
import { togglePostModal } from '../actions'


class Header extends Component {
    state = {
        isModalOpened: false
    }
    render() {
        const { activeCategory, categories, togglePostModal } = this.props;
        return (
            <Menu inverted>
                <Container>
                    <Menu.Item active={typeof activeCategory === 'undefined'}>
                        <Link to='/' >All</Link>
                    </Menu.Item>
                    {categories.map((c, index) =>
                        <Menu.Item key={index} active={activeCategory === c.name}>
                            <Link to={`/${c.path}`}>{c.name}</Link>
                        </Menu.Item>
                    )}
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button size='mini' primary onClick={(e) => togglePostModal()}> New Post</Button>
                        </Menu.Item>
                        <Menu.Item>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
                <ModalPost close={() => this.setState({ isModalOpened: false })} />
            </Menu>
        )
    }
}
function mapStateToProps({ categories, activeCategory }) {
    return {
        categories,
        activeCategory
    }
}
function mapDispatchToProps(dispatch) {
    return {
        togglePostModal: () => dispatch(togglePostModal())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)