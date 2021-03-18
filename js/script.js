function validateForm() {
    var formIsValid = true;

    // Check 1
    var password = document.querySelector("#txtPassword");
    var confirmpassword = document.querySelector("#txtConfirmPassword");
    var divPasswordErr = document.querySelector("#divPasswordErr");

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
    // This adds a yellow background to any input that fails.
    // Still need to figure out how to also add an accompanying error message for each input that fails.
    var elements = document.getElementsByTagName("input");
    var invalidChars = ['#', '-', '(', ')', '{', '}', '<', '>', '`', '"'];
    var validChars = true;
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < invalidChars.length; j++) {
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                elements[i].classList.add("hasError");
                validChars = false;
                alert(elements[i].name +" contains invalid characters!");
                //document.getElementById(elements[i].id + "Error").classList.remove("invisible");// 
                // we could alternatively just get the parent html(of the element) 
                // and then add some innerhtml to it which would save us from having to put the invisble error html 
                // there
                break;
            }
            elements[i].classList.remove("hasError");
        }
    }
    if (validChars == false) {
        formIsValid = false;
    }
    
    /*if(validChars == true){// this whole if is also error message code just incase we need to remove it
        console.log();
        errorElements = document.getElementsByClassName("errorClass");
        for (let i=0;i<elements.length;++i){
            if(!("invisible" in errorElements[i].classList)){
                errorElements[i].classList.add("invisible");
            }
        }
    }*/
    

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