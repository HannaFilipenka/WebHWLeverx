function Account(){
    var accounNumber
    var accountPin;
    var dateOfCreation;
    var accountType;

    this.setNumber = function(sNumber) {
        accounNumber = sNumber;
      };
    
    this.setPin = function(sPin) {
        accountPin = sPin;
      };

    this.setDate = function() {
        dateOfCreation = new Date();
      };

    this.setAccountType = function(sAccountType) {
        accountType = sAccountType;
      };

    this.getCredentials = function(){
        return {
            number : accounNumber,
            pin : accountPin,
            creationDate : dateOfCreation,
            accountType :accountType
        };
    }
}

function SavingsAccount(oUserData){
    CurrentAccount.apply(this);
    this.setUser(oUserData.userName);
    this.setDate();
    this.setNumber(oUserData.accountNumber);
    this.setPin(oUserData.accountPin);
    this.setAccountType(oUserData.accountType);
};

function CurrentAccount(oUserData){
    Account.apply(this);
    var username;

    this.setUser = function(sUser){
        username = sUser;
    }

    this.getAccountData = function(){
        return $.extend(true, this.getCredentials(), {userName : username});
    }
    if(oUserData){
        this.setUser(oUserData.userName);
        this.setDate();
        this.setNumber(oUserData.accountNumber);
        this.setPin(oUserData.accountPin);
        this.setAccountType(oUserData.accountType);
    }
}

saveAccountInfo = function(){
    var savingsAccount;
    var oUserData = getFilledObject();
    if(oUserData.accountType === "currentAccount"){
        var currentAccount = new CurrentAccount(oUserData);
        console.log(currentAccount.getAccountData());
    }else{
        var savingsAccount = new SavingsAccount(oUserData);
        console.log(savingsAccount.getAccountData());

    }
}

getFilledObject = function(){
    var aAccountType = document.getElementsByName("account");
    for (var i = 0; i < aAccountType.length; i++) {
        if (aAccountType[i].checked) {
            var sAccountType = aAccountType[i].value;
            break;
        }
    }
    return {
        accountNumber : document.getElementById("accountNumber").value,
        accountPin : document.getElementById("pin").value,
        accountType : sAccountType,
        username : document.getElementById("userName").value

    };
}



