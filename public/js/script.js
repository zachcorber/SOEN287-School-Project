//Date and Time
function updateTime() {
    var currentTime = new Date();
    var day = currentTime.getDay();
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridiem = "AM";

    if (hours >= 12) {
        meridiem = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }

    if (hours === 0) {
        hours = 12;
    }

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    const dateString = month + "/" + day + "/" + year;

    var timeString = dateString + " " + hours + ":" + minutes + ":" + seconds + " " + meridiem + " EST";
    document.getElementById("clock").innerHTML = timeString;
}
setInterval(updateTime, 1000);

//To change the colour of the interested button in the Browse pets page
function changeColor(button) {
    button.classList.toggle('clicked');
    alert("If you would like to contact the owner of this animal, please email petowner123@gmail.com!");
}

//Find a dog/cat Form Validation
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("pet-adoption-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const petType = document.getElementById("pet-type");
        const breedSpecific = document.getElementById("breed_specific");
        const breedDoesntMatter = document.getElementById("breed_doesntmatter");
        const identifyBreed = document.getElementById("identifybreed");

        let errorMessages = [];

        if (petType.value === "") {
            errorMessages.push("Please select if you want a dog or a cat.");
        }

        if (!breedSpecific.checked && !breedDoesntMatter.checked) {
            errorMessages.push("Please select your breed preference.");
        } else if (breedSpecific.checked && identifyBreed.value.trim() === "") {
            errorMessages.push("Please identify the specific breed.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
        } else {
            form.submit();
        }
    });
});


// Giveaway Pet Form Validation
document.getElementById('pet-adoption-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let formIsValid = true;
    let errorMessage = '';

    const petType = document.getElementById('pet-type');
    const agePreference = document.getElementById('age-preference');
    const genderPreference = document.getElementById('gender-preference');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');

    if (petType.value === '') {
        formIsValid = false;
        errorMessage += 'Please select the type of pet.\n';
    }

    if (agePreference.value === '') {
        formIsValid = false;
        errorMessage += 'Please select the age of the pet.\n';
    }

    if (genderPreference.value === '') {
        formIsValid = false;
        errorMessage += 'Please select the gender of the pet.\n';
    }

    if (firstName.value.trim() === '') {
        formIsValid = false;
        errorMessage += 'Please enter your first name.\n';
    }

    if (lastName.value.trim() === '') {
        formIsValid = false;
        errorMessage += 'Please enter your last name.\n';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        formIsValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }

    if (!formIsValid) {
        alert(errorMessage);
    } else {
        this.submit();
    }
});

//login form validation
function validateLogin() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    var usernamePattern = /^[a-zA-Z0-9]{2,20}$/;
    var passwordPattern = /^[a-zA-Z0-9]{4,20}$/;

    if (!usernamePattern.test(username)) {
        alert("Invalid username format.");
        return false;
    }

    if (!passwordPattern.test(password)) {
        alert("Invalid password format.");
        return false;
    }
    return true;
}

//register form validation
function validateRegistration() {
    var username = document.forms["registerForm"]["username"].value;
    var password = document.forms["registerForm"]["password"].value;
    const hasDigit = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const usernamePattern = /^[a-zA-Z0-9]{2,20}$/;

    if (!usernamePattern.test(username)) {
        alert("Invalid username format.");
        return false;
    }

    if (password.length < 4) {
        alert("Password must be at least 4 characters long.");
        return false;
    }

    if (!hasDigit.test(password)) {
        alert("Password must contain at least one digit.");
        return false;
    }

    if (!hasLetter.test(password)) {
        alert("Password must contain at least one letter.");
        return false;
    }
    return true;
}

//Display message when logging out
document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", () => {
            alert("You have been logged out.");
        });
    }
});