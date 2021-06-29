document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    let errors = {};
    let form = event.target;

    let username = form.querySelector('[name="username"]').value;

    if (username.length < 5) {
        errors.username = 'Min 5 letters';
    }

    let password = form.querySelector('[name="password"]').value;

    if (password.length < 5) {
        errors.password = 'Invalid Password';
    }

    form.querySelectorAll('.error-text').forEach(item => {
        item.textContent = '';
    })

    for (let name in errors) {
        let errorPlaceholder = document.getElementById('error_' + name);

        if (errorPlaceholder) {
            errorPlaceholder.textContent = errors[name];
        }
    }


    if (Object.keys(errors).length === 0) {
        form.submit();
    }

    console.log(errors);

});