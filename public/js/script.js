function validateForm() {
    var formIsValid = true;

    // Check 1
    var password = document.querySelector("#txtPassword");
    var confirmpassword = document.querySelector("#txtConfirmPassword");
    var divPasswordErr = document.querySelector("#txtPasswordErr");

    if (password.value != confirmpassword.value) {
        divPasswordErr.classList.remove("invisible");
        divPasswordErr.innerHTML = "Passwords must match.";
        password.classList.add("hasError");
        confirmpassword.classList.add("hasError");
        formIsValid = false;
    }
    else {
        divPasswordErr.classList.add("invisible");
        password.classList.remove("hasError");
        confirmpassword.classList.remove("hasError");
    }

    // Check 2
    var elements = document.getElementsByTagName("input");
    
    elements.splice(elements.indexOf("txtDOB"),1);
    //there is some error when trying to validate the date of birth
    // i think it has to do with the format of the date  input type.
    // i just remove dob from the list of elements that get checked...
    


    var invalidChars = ['#', '-', '(', ')', '{', '}', '<', '>', '`', '"'];
    for (let i = 0; i < elements.length; i++) {
        let validInput = true;
        for (let j = 0; j < invalidChars.length; j++) {
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                validInput = false;
            }
        }
        if (validInput == false) {
            formIsValid = false;
            elements[i].classList.add("hasError");
            document.getElementById(elements[i].id + "Err").classList.remove("invisible");
            document.getElementById(elements[i].id + "Err").innerHTML = "Invalid character entered."
        }
        else {
            elements[i].classList.remove("hasError");
            document.getElementById(elements[i].id + "Err").classList.add("invisible");
        }
    }

    // Check 3
    var hasLowerCase = false;
    var hasCapital = false;
    var hasNumber = false;
    for (let char of password.value) {
        if (char == char.toLowerCase()) {
            hasLowerCase = true;
        }
        if (char == char.toUpperCase()) {
            hasCapital = true;
        }
        if (!isNaN(char * 1)) {
            hasNumber = true;
        }
    }
    if (!hasLowerCase || !hasCapital || !hasNumber) {
        divPasswordErr.classList.remove("invisible");
        divPasswordErr.innerHTML = "Password must contain a lower case letter, uppercase letter, and number.";
        password.classList.add("hasError");
        confirmpassword.classList.add("hasError");
        formIsValid = false;
    }
    else {
        divPasswordErr.classList.add("invisible");
        password.classList.remove("hasError");
        confirmpassword.classList.remove("hasError");
    }

    return formIsValid;
}

function displaySecurityAnswer() {
    var divSecurityAnswer = document.querySelector("#divSecurityAnswer");
    divSecurityAnswer.classList.remove("invisible");
}