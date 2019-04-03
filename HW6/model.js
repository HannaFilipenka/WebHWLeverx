function Account(accountNumber, accountPin) {
    this.accountNumber = accountNumber;
    this.accountPin = accountPin;
  };

  Account.prototype.setTypeOfUser = function(sType) {
    this.typeOfUser = sType;
  };

  Account.prototype.setDate = function(){
    this.changeDate = new Date();
  };

  Account.prototype.getAccountInfo = function(){
      return {
        accountNumber : this.accountNumber,
        accountPin : this.accountPin,
        changeDate : this.changeDate,
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