const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    var re = /\S+@\S+\.\S+/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkPassword(input1, input2) {
    if (input1.value.match(/[a-z]/g) &&
        input1.value.match(/[A-Z]/g) &&
        input1.value.match(/[0-9]/g) &&
        input1.value.match(/[^a-zA-Z\d]/g) &&
        input1.value.length >= 6) {
        showSuccess(input1);
    } else {
        showError(input1, 'Need 1 uppercase, 1 lowercase, 1 special character')
    }
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);

    checkLength(username, 3, 8);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPassword(password, password2);

    /* if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    } */
});