var getPreparedObject = function(sOperation){
    var oUserData = getObject(sOperation);
    if(oUserData.accountType === "SavingsAccount"){
        var savingsAccount = new SavingsAccount(oUserData.accountNumber, oUserData.accountPin);
        savingsAccount.setDate();
        savingsAccount.setUser(oUserData.username);
        savingsAccount.setTypeOfUser(oUserData.accountType);
        return savingsAccount.getAccountInfo();
    } else {
        var currentAccount = new CurrentAccount(oUserData.accountNumber, oUserData.accountPin);
        currentAccount.setDate();
        currentAccount.setUser(oUserData.username);
        currentAccount.setTypeOfUser(oUserData.accountType);
        return currentAccount.getAccountInfo();
    }   
};

var getCheckedAccount = function(aAccountType){
    for (var i = 0; i < aAccountType.length; i++) {
        if (aAccountType[i].checked) {
            return sAccountType = aAccountType[i].value;
        }
    }
};

var getObject = function(sOperation){
    var sAccountType;
    switch (sOperation){
        case "create" : 
            sAccountType = getCheckedAccount(document.getElementsByName("optradio"));       
            return {
                accountNumber : document.getElementById("caccountNumber").value,
                accountPin : document.getElementById("caccountPin").value,
                accountType : sAccountType,
                username : document.getElementById("cUsername").value
            };
        case "update" :
            sAccountType = getCheckedAccount(document.getElementsByName("uptradio")); 
            return {
                accountNumber : document.getElementById("uaccountNumber").value,
                accountPin : document.getElementById("uaccountPin").value,
                accountType : sAccountType,
                username : document.getElementById("uUsername").value
          
            };
        }   
};

var onCreate = function(ev) {
    ev.preventDefault();
    var oPreparedData = getPreparedObject("create");

    return new Promise(function(fnResolve, fnReject) {
        $.ajax('http://195.50.2.67:2403/filaccounts',{
            type : "POST",
            data : JSON.stringify(oPreparedData),
            contentType: "application/json",
            success : function(data, status, oResponse) {
                document.getElementById("createForm").dispatchEvent(new Event('submit'));
                fnResolve(data);
            },
            error : function(data, status, oResponse) {
                fnReject({
                    data : data,
                    status : status,
                    response : oResponse
                });
            }
        });
    });
};

var onRead = function() {
    getData().then(function(aData){
        var resultTBody = document.createElement('tbody');
        aData.map(function(nthCPU){
            resultTBody.appendChild(parseCPUToTableRow(nthCPU));
        });

        var table = document.getElementById('rTBody').parentElement;
        table.replaceChild(resultTBody,document.getElementById('rTBody'));
        resultTBody.id = 'rTBody';
    });
};

var getData = function(){
    return new Promise(function(fnResolve, fnReject) {
        $.ajax("http://195.50.2.67:2403/filaccounts",{
            type : "GET",
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success : function(data, status, oResponse) {
                fnResolve(data);
            },
            error : function(data, status, oResponse) {
                fnReject({
                    data : data,
                    status : status,
                    response : oResponse
                });
            }
        });
    });
};

var onUpdate = function(ev) {
    ev.preventDefault();
    var sId = document.getElementById("uid").value;
    var oPreparedData = getPreparedObject("update");

    return new Promise(function(fnResolve, fnReject) {
        $.ajax("http://195.50.2.67:2403/filaccounts/"+ sId, {
            type : "PUT",
            data : JSON.stringify(oPreparedData),
            contentType : "application/json",
            success : function(data, status, oResponse) {
                console.log(data)
                fnResolve(data);
            },
            error : function(data, status, oResponse) {
                fnReject({
                    data : data,
                    status : status,
                    response : oResponse
                });
            }
        });
    });
};

var onDelete = function(ev) {
    ev.preventDefault();
    var sId = document.getElementById("did").value;
    return new Promise(function(fnResolve, fnReject) {
        $.ajax("http://195.50.2.67:2403/filaccounts/"+ sId,{
            type : "DELETE",
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success : function(data, status, oResponse) {
                fnResolve(data);
            },
            error : function(data, status, oResponse) {
                fnReject({
                    data : data,
                    status : status,
                    response : oResponse
                });
            }
        });
    });
};

var onPrepareUpdate = function(ev){
    ev.preventDefault();
    getData().then(function(aData){
        var ids = document.createElement('select');
        ids.className = 'form-control';
        aData.map(function(nthCPU){
            var id = document.createElement('option');
            id.innerHTML = nthCPU['id'];
            ids.appendChild(id);
        });
        var form = document.getElementById('uid').parentElement;
        form.replaceChild(ids,document.getElementById('uid'));
        ids.id='uid';
    });
};

var parseCPUToTableRow = function(CPUs){
    var row = document.createElement('tr');

    id = document.createElement('th');
    id.innerText = CPUs['id'];
    row.appendChild(id);

    accountNumber = document.createElement('td');
    accountNumber.innerText = CPUs['accountNumber'];
    row.appendChild(accountNumber);

    accountPin = document.createElement('td');
    accountPin.innerText = CPUs['accountPin'];
    row.appendChild(accountPin);
   
    typeOfUser=document.createElement('td');
    typeOfUser.innerText=CPUs['typeOfUser'];
    row.appendChild(typeOfUser);
    
    userName=document.createElement('td');
    userName.innerText=CPUs['userName'];
    row.appendChild(userName);

    changeDate = document.createElement('td');
    changeDate.innerText = new Date(CPUs['changeDate']);
    row.appendChild(changeDate);

    return row;
}

(function () {
  
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
})()