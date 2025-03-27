import { errors } from 'com'

const { CredentialsError, SystemError, ValidationError } = errors

import loginUser from '../logic/loginUser'

function Login(props) {
    console.log('Login -> render')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            loginUser(username, password)
                .then(() => props.onLoginSuccess())
                .catch(error => {
                    if (error instanceof CredentialsError)
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

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="p-20">
        <h2 className="text-3xl">Login</h2>

        <form className="flex flex-col gap-2" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input className="border-2 border-black px-2" type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input className="border-2 border-black px-2" type="password" id="password" />

            <button className="bg-black text-white" type="submit">Login</button>
        </form>

        <p></p>

        <a className="underline" href="" onClick={handleRegisterClick}>Register</a>
    </main>
}

export default Login