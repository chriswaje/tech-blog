const signupFormHandler = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();

    if (password.length >= 8 && username) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Sign-up failed')
        }
    } else {
        alert('Please include both fields. Ensure that password is atleast 8 characters long');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);