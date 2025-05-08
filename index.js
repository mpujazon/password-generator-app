const passwordElement = document.getElementById('password');
const copiedMessage = document.getElementById('copied-text');
const copyButton = document.getElementById('icon-copy');
const lengthNumber = document.getElementById('length-number');
const lengthRange = document.getElementById('character-length-range');
const checkboxes = document.querySelectorAll('.checkbox');
const strengthVisual = document.getElementById('strength-visual');
const submitButton = document.getElementById('submit-button');

const arrays = {
    uppercaseArray: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
    lowercaseArray: Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
    numbersArray: Array.from({ length: 10 }, (_, i) => i.toString()), // 0-9
    symbolsArray: ['!', '@', '#', '$', '%', '&', '*', '-', '=', '+', '.', '/', '?']
}

const copyPassword = () => {
    if (!passwordElement.classList.contains('disabled')){
        navigator.clipboard.writeText(passwordElement.textContent)
            .then(()=> {
                copiedMessage.classList.remove('hidden');
                setTimeout(() => copiedMessage.classList.add('hidden'), 4000)
            });
    }
}

const updateLengthNumber = () => {
    lengthNumber.innerHTML = lengthRange.value;
}

const generatePassword = () => {
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
}

copyButton.addEventListener('click', copyPassword);
lengthRange.addEventListener('input', updateLengthNumber);
submitButton.addEventListener('click', generatePassword);