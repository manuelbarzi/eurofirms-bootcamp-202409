import { errors } from 'com'

const { ValidationError, SystemError, NotFoundError } = errors

import createPost from '../logic/createPost'

function CreatePost(props) {
    console.log('CreatePost -> render')

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            createPost(image, text)
                .then(() => props.onCreated())
                .catch(error => {
                    if (error instanceof NotFoundError)
                        alert(error.message)
                    else
                        alert('sorry, there was a problem. try again later.')

                    console.error(error)
                })
        } catch (error) {
            if (error instanceof ValidationError)
                alert(error.message)
            else
                alert('sorry, there was a problem. try again later.')

            console.error(error)
        }
    }

    return <main>
        <h2>Create Post</h2>

        <form onSubmit={handleCreatePostSubmit}>
            <label htmlFor="image">Image</label>
            <input type="url" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Create</button>
        </form>
    </main>
}

export default CreatePost