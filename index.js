const passwordElement = document.getElementById('password');
const copiedMessage = document.getElementById('copied-text');
const copyButton = document.getElementById('icon-copy');
const lengthNumber = document.getElementById('length-number');
const lengthRange = document.getElementById('character-length-range');
const checkboxes = document.querySelectorAll('.checkbox');
const strengthVisual = document.getElementById('strength-visual');
const strengthWord = document.getElementById('strength-word');
const submitButton = document.getElementById('submit-button');

// Object containing arrays of all possible characters, grouped by category.
const arrays = {
    uppercaseArray: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
    lowercaseArray: Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
    numbersArray: Array.from({ length: 10 }, (_, i) => i.toString()), // 0-9
    symbolsArray: ['!', '@', '#', '$', '%', '&', '*', '-', '=', '+', '.', '/', '?']
}

// Allows the user to copy the password.
const copyPassword = () => {
    if (!passwordElement.classList.contains('disabled')){
        navigator.clipboard.writeText(passwordElement.textContent)
            .then(()=> {
                copiedMessage.classList.remove('hidden');
                setTimeout(() => copiedMessage.classList.add('hidden'), 4000)
            });
    }
}

// Keeps the displayed length number updated
const updateLengthNumber = () => {
    lengthNumber.innerHTML = lengthRange.value;
}

// Generates the password by selecting random characters from the chosen categories
const generatePassword = () => {
    let unchecked = true;
    checkboxes.forEach((checkbox) => {
        checkbox.checked?  unchecked = false : "";
    });
    if(unchecked) return;

    let password = '';
    let customArray = [];
    checkboxes.forEach((checkbox)=>{
        if ( checkbox.checked ){
            const arrayName = checkbox.getAttribute('name') + 'Array';
            customArray = customArray.concat(arrays[arrayName]);
        }
    });    
    
    for(let i = 0; i < lengthRange.value; i++){
        password += customArray[Math.floor(Math.random()*customArray.length)]
    }

    passwordElement.classList.remove('disabled');
    passwordElement.innerHTML = password;
    updateStrengthIndicator(password);
}

// Updates the strength indicator based on the number of characters and whether they are only numbers
const updateStrengthIndicator = (password) => {
    if (password.length <= 6){
        strengthVisual.className = 'too-weak';
        strengthWord.innerHTML = 'to weak!';
        return;
    }
    if (!isNaN(password) && password.length < 16){
        strengthVisual.className = 'weak';
        strengthWord.innerHTML = 'weak';
        return;
    }
    if(password.length < 10){
        strengthVisual.className = 'weak';
        strengthWord.innerHTML = 'weak'
        return;
    }
    if(password.length <= 14){
        strengthVisual.className = 'medium';
        strengthWord.innerHTML = 'medium'
        return;
    }

    strengthVisual.className = 'strong';
    strengthWord.innerHTML = 'strong'
}

// Keeps the range background updated based on the thumb's position
const updateRangeBackground = () => {
    const value = lengthRange.value;
    const min = lengthRange.min;
    const max = lengthRange.max;
    const percentage = ((value - min) / (max - min) * 100);

    lengthRange.style.background = `linear-gradient(to right, var(--clr-green-200) ${percentage}%, var(--clr-grey-850) ${percentage}%)`;
}


copyButton.addEventListener('click', copyPassword);
lengthRange.addEventListener('input', updateLengthNumber);
submitButton.addEventListener('click', generatePassword);
lengthRange.addEventListener('input', updateRangeBackground);