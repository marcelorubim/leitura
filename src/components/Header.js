import React from 'react';
import { Menu, Button, Container, Divider, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Header = ({ activeCategory, categories,orderBy }) => {

    return (
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
                    </Menu.Item>

                </Menu.Menu>
            </Container>
        </Menu>)
}
function mapStateToProps({ categories, posts, activeCategory}) {
    return {
        categories,
        posts,
        activeCategory
    }
}
export default connect(
    mapStateToProps,
)(Header)