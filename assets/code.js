//random password generator

//testing & debug: set to true to skip prompts and use defaults
let debug=false;

//constants for character sets
const specialChars='!@#$%^&*()';
const numericChars='0123456789';
const lowerChars='abcdefghijklmnopqrstuvwxyz';
const upperChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//variable defaults
let passwordLength=20;
let includeSpecial=false;
let includeNumeric=false;
let includeLower=false;
let includeUpper=false;
let promptChars=specialChars+numericChars+lowerChars+upperChars;
let newChar;
let randomPassword="";
let finalPassword="";

//prompt for password length, between 8 and 128 characters
function promptLength() {
    passwordLength=prompt("How many characters? (between 8 and 128");
    console.log("length: "+passwordLength);
    //validate length is between 8 and 128 characters, else run function again
    if(passwordLength>=8 && passwordLength<=128){
        return;
    } else {
        promptLength();
    }
}

//prompt for character types, build promptChars var with included characters
function promptForCharTypes(){
    promptChars="";
    alert("Please confirm at least one character type in the following prompts.");

    includeSpecial=confirm("Include special characters?");
    if (includeSpecial){
        promptChars=promptChars+specialChars;
        console.log("include char: special");
    }

    includeNumeric=confirm("Include numeric characters?");
    if (includeNumeric){
        promptChars=promptChars+numericChars;
        console.log("include char: numeric");
    }

    includeLower=confirm("Include lowercase characters?");
    if (includeLower){
        promptChars=promptChars+lowerChars;
        console.log("include char: lower");
    }

    includeUpper=confirm("Include uppercase characters?");
    if (includeUpper){
        promptChars=promptChars+upperChars;
        console.log("include char: upper");
    }

    //validate at least one character type is true, else run function again
    if (includeSpecial===true || includeNumeric===true || includeLower===true || includeUpper===true){
        return;
    } else {
        promptForCharTypes();
    }
}

//generate random character from provided character set
function genNewChar(charSet){
    newChar=charSet[Math.floor(Math.random()*charSet.length)];
    return newChar;
}

// generate fully random password using the provided character set, with the user-specified length. loops previous genNewChar function. 
function genPassword(charSet){
    randomPassword="";
    for (let i=0;i<passwordLength;i++){
        randomPassword=randomPassword+genNewChar(charSet);
    }
}

// checks for mandatory character selections and inserts them as required, each removing a character from the password to preserve the original length. 
// ensures user selected character types definitely occur in the password even if not randomly generated
function insertMandatoryChars(){
        finalPassword=randomPassword;
        if (includeSpecial===true){
            finalPassword=genNewChar(specialChars)+finalPassword.slice(0,finalPassword.length-1);
        }
        if (includeNumeric===true){
            finalPassword=genNewChar(numericChars)+finalPassword.slice(0,finalPassword.length-1);
        }
        if (includeLower===true){
            finalPassword=genNewChar(lowerChars)+finalPassword.slice(0,finalPassword.length-1);
        }
        if (includeUpper===true){
            finalPassword=genNewChar(upperChars)+finalPassword.slice(0,finalPassword.length-1);
        }
}

//calls the various functions in the correct sequence
function mainProgram() {
    //skips prompts if debug is true
    if (debug===false){
        promptLength();
        promptForCharTypes();
    } 
    genPassword(promptChars);
    insertMandatoryChars();
    console.log("password generated: "+finalPassword);
}

//page elements to manipulate
let generate = document.querySelector("#generate");
let container = document.querySelector("#password");
let wholePage = document.body.parentElement;
let copyClip = document.querySelector("#copy");

//event listeners

//on button click, generate password & update page to display
generate.addEventListener("click", function() {
    //*** runs the main program ***
    mainProgram();
    //update page with password
    container.placeholder=finalPassword;
    //overrides CSS text-transforms to display password correctly and highlights textarea
    container.setAttribute("style", "text-transform: none; border-color: rgb(255, 252, 93);");
    //set focus to copy button
    copyClip.focus();
    //sets page background image
    wholePage.setAttribute("style", "background-image:url(\"assets/starfield.gif\");");
});

//on button click, copy password to clipboard
copyClip.addEventListener("click", function() {
    //check if password exists to copy, copy text if so
    if (finalPassword) {
        navigator.clipboard.writeText(finalPassword).then(function() {
            console.log('copied to clipboard');
          }, function(err) {
            console.log('copy error');
          });
    } else {
    alert("generate password first");
    }
    //removes focus from copy button
    document.getElementById("password").focus();
});




