function Account(accountNumber, accountPin) {
    this.accountNumber = accountNumber;
    this.accountPin = accountPin;
  };

  Account.prototype.setTypeOfUser = function(sType) {
    this.typeOfUser = sType;
  };

  Account.prototype.setDate = function(){
    this.creationDate = new Date();
  };

  Account.prototype.getAccountInfo = function(){
      return {
        accountNumber : this.accountNumber,
        accountPin : this.accountPin,
        creationDate : this.creationDate,
        typeOfUser : this.typeOfUser,
        userName : this.userName
      };
  };
  
  function CurrentAccount() {
    Account.apply(this, Array.prototype.slice.call(arguments));
  };

  function SavingsAccount() {
    Account.apply(this, Array.prototype.slice.call(arguments));
  };

  SavingsAccount.prototype = Object.create(Account.prototype);
  SavingsAccount.prototype.setUser = function(sUser) {
    this.userName = sUser;
  };

  SavingsAccount.prototype.getAccountInfo = function(){
    return Account.prototype.getAccountInfo.call(this, this.userName);
  }


  CurrentAccount.prototype = Object.create(Account.prototype);
  CurrentAccount.prototype.setUser = function(sUser) {
    this.userName = sUser;
  };

  CurrentAccount.prototype.getAccountInfo = function(){
    return Account.prototype.getAccountInfo.call(this, this.userName);
  }
  
saveAccountInfo = function(){
  var savingsAccount;
  var oUserData = getFilledObject();
  if(oUserData.accountType === "currentAccount"){
      var currentUser = new CurrentAccount(oUserData.accountNumber, oUserData.accountPin);
      currentUser.setUser(oUserData.username);
      currentUser.setTypeOfUser(oUserData.accountType);
      currentUser.setDate();
      console.log(currentUser.getAccountInfo());
  }else{
      var savingsAccount = new SavingsAccount(oUserData.accountNumber, oUserData.accountPin);
      savingsAccount.setUser(oUserData.username);
      savingsAccount.setTypeOfUser(oUserData.accountType);
      savingsAccount.setDate();
      console.log(savingsAccount.getAccountInfo());

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


