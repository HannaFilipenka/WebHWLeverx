
window.onload = function(){
    var oUsernamePrompt = prompt("Please enter your username");
    var bValid = validationCheck(oUsernamePrompt);
    return bValid ? alert("You've entered only numbers") : document.write("<p>" + oUsernamePrompt.toLowerCase() + "</p>");
};

var validationCheck = function(oUser){
    return !isNaN(parseFloat(oUser));
};