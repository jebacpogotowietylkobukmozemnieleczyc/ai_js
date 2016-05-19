function isEmtpy(text){
    return text.length==0;
}

function checkString(string) {
    return !(isEmtpy(string) || isWhiteSpace(string));

}
function checkString(obj,alertString) {
    var string = obj.value;
    if((isEmtpy(string) || isWhiteSpace(string)) ){
        setWrong(obj);
        return false;
    }
    return true;
}
function validate(formularz) {
    var check = true;
    if(!checkStringAndFocus(formularz.elements["f_imie"],"Podaj imie."))check=false;
    if(!checkString(formularz.elements["f_nazwisko"],""))check=false;
    if(!checkString(formularz.elements["f_nazwisko_p"],"") )check=false;
    if(checkZIPCodeRegEx(formularz.elements["f_kod"]) )check=false;
    if(!checkString(formularz.elements["f_ulica"],"") )check=false;
    if(!checkString(formularz.elements["f_miasto"],""))check=false;
    if(!checkEmailRegEx(formularz.elements["f_email"]))check=false;

    if(!check)return false;
    return true;
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);//returns the character at the specified index in a string.
        if (ws.indexOf(c) == -1) {//returns the position of the first occurrence of a specified value in a string.
            return false;
        }
    }
    return true;
}

function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    }
    else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}


function setWrong(obj) {
    obj.className = "wrong";
}
function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);//extracts parts of a string, beginning at the character at the specified position, and returns the specified number of characters.
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        setWrong(obj);
        return false;
    }
    else {
        return true;
    }
}

function checkEmailRegEx(obj) {
    var str = obj.value;
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        setWrong(obj);
        return false;
    }
}

function checkZIPCodeRegEx(str) {
    //todo regEx
    var kod = /^[0-9]{2}-[0-9]{3}$/;
    if (kod.test(str)){
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return false;
    }
    else {
        document.getElementById("kod").innerHTML = "Źle";
        document.getElementById("kod").className = "red";
        setWrong(document.getElementById("f_kod"));
        return true;
    }
}

var errorField = "";
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}
function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) { //returns the node type, as a number, of the specified node.
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

function light(){
    var element = document.getElementsByTagName("tr").item(0);
    alterRows(1,element);
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}
function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}
