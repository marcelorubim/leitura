import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form,Select } from 'semantic-ui-react'
import { insertPost } from '../actions'
import uuid from 'uuid'

const initialState = {
    post: {
        title: '',
        author: '',
        body: '',
        category: 'react'
    }
}
class ModalPost extends Component {
    state = initialState;
    handleSubmit = (e) => {
        e.preventDefault();
        const { insertPost, close } = this.props
        const { post } = this.state
        console.log(post)
        const isNewPost = typeof post.id === "undefined"
        post.id = post.id || uuid.v1()
        post.timestamp = new Date().getTime();
        insertPost(post);
        e.target.reset();
        this.setState(initialState);
        close();
    }
    handleChange(field, value) {
        this.setState((prevState) => (
            {
                post: {
                    ...prevState.post,
                    [field]: value
                }
            }
        ));
    }
    render() {
        const { open, close, categories } = this.props
        const { post } = this.state
        return (

            <Modal open={open} onClose={close} closeIcon>
                <Modal.Header>
                    Post
                </Modal.Header>
                <Modal.Content>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.Input label='Author' placeholder='Author' name='author' value={post.author} onChange={(e) => this.handleChange('author', e.target.value)} />
                        <Form.Input label='Title' placeholder='Title' name='title' value={post.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                        <Form.Field control={Select} label='Categories' options={categories} placeholder='Categories' value={post.category}  onChange={(e,{value}) => this.handleChange('category', value)} />
                        <Form.TextArea label='Text' placeholder='Text' name='body' value={post.body} onChange={(e) => this.handleChange('body', e.target.value)} />
                        <Button negative>
                            Cancel
                        </Button>
                        <Button primary>
                            Save
                         </Button>
                    </Form>

                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>

            </Modal>

        )
    }
}
function mapStateToProps({ categories }, { open }) {
    return {
        open,
        categories:categories.map(c => ({ key: c.name, text: c.name, value: c.name }))
    }
}
function mapDispatchToProps(dispatch) {
    return {
        insertPost: (post) => dispatch(insertPost(post))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPost)