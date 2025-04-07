import React from 'react'

const Form = () => {
    return (
        <form onSubmit={handleLogin}>
            <Input
                value={email}
                onChange={(target) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
            />
        </form>
    )
}

export default Form