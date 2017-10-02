function load() {
    todosList = localStorage.getItem("saved_todos");
    todosList = JSON.parse(todosList);
    numComplt = localStorage.getItem("num");
    lastBtn = localStorage.getItem("l_btn");
    m = localStorage.getItem("m_id");
    document.getElementsByClassName('hero')[0].style.fontSize = "xx-large";
    if (!todosList) {
        todosList = [];
        numComplt = 0;
        m = 0;
        lastBtn = 1;
        document.getElementsByClassName("all")[0].focus();
    } else {
        if (todosList.length == numComplt)
            document.getElementsByClassName('hero')[0].style.opacity = "1";
        clearBtn();
        for (var i = 0; i < todosList.length; i++) {
            var d1 = document.getElementById('todos_list');
            var chacked_part = todosList[i].isDone ? 'checked="checked"' : ''
            var newDiv = "<div class='newLine'  id='" + todosList[i].key + "' onmouseover='showX(this.id)' onmouseout='unShowX(this.id)'> <input class='v' type='checkbox' " + chacked_part + " onchange='done(this.parentNode.id)'><input type='text' class='pVal'  ondblclick='changeToTxt(this.parentNode.id)' onblur='changeToP(this.parentNode.id)' value=' " + todosList[i].value + "' readonly ><button class='del' onclick='deleteTodo(this);deleteLine(this.parentNode.id)'>X</button>  </div>";
            d1.insertAdjacentHTML('beforeend', newDiv);
            document.getElementsByClassName("fill_in_todo")[0].value = "";
            localStorageSaving();
        }
        if (todosList.length > 0) {
            document.getElementsByClassName('mainDiv')[0].style.display = "inline-block";
        }
        if (lastBtn == 2) {
            showActive();
            document.getElementsByClassName("active")[0].focus();
        } else if (lastBtn == 3) {
            showCompleted();
            document.getElementsByClassName("completed")[0].focus();
        } else {
            document.getElementsByClassName("all")[0].focus();
        }
    }
}

function addTodo(e, text) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && text.value != "") {
        addLine(text.value);
    }
    localStorageSaving();
}

function Todo(val) {
    this.value = val;
    this.isDone = false;
    this.key = "todo" + (m++);
}

function deleteLine(id) {
    if (todosList.length == 1) {
        document.getElementsByClassName("mainDiv")[0].style.display = "none";
    }
    for (var j = 0; j < todosList.length; j++) {
        if (todosList[j].key == id) {
            if (todosList[j].isDone == true) {
                numComplt--;
            }
            todosList.splice(j, 1);
            clearBtn();
            localStorageSaving();
            return true;
        }
    }
    return false;
}

function done(id) {
    for (var j = 0; j < todosList.length; j++) {
        if (todosList[j].key == id) {
            if (todosList[j].isDone == false) {
                todosList[j].isDone = true;
                numComplt++;
            } else {
                document.getElementsByClassName('hero')[0].style.opacity = "0.5";
                todosList[j].isDone = false;
                numComplt--;
            }
        }
    }
    clearBtn();
    localStorageSaving();

}

var todosList = [];
var saved = [];
var newTodo;
var m;
var val = true;
var numComplt = 0;
var lastBtn;

function addLine(txt) {
    document.getElementsByClassName('mainDiv')[0].style.display = "inline-block";
    newTodo = new Todo(txt);
    todosList.push(newTodo);
    var d1 = document.getElementById('todos_list');
    var newDiv = "<div id='" + newTodo.key + "' class='newLine' onmouseover='showX(this.id)' onmouseout='unShowX(this.id)'> <input class='v' type='checkbox' onchange='done(this.parentNode.id)'> <input type='text' class='pVal'  ondblclick='changeToTxt(this.parentNode.id)' onblur='changeToP(this.parentNode.id)' value=' " + newTodo.value + "' readonly ><button class='del' onclick='deleteTodo(this);deleteLine(this.parentNode.id)'>X</button>  </div>";
    d1.insertAdjacentHTML('beforeend', newDiv);
    document.getElementsByClassName("fill_in_todo")[0].value = "";
    if (todosList.length > numComplt)
        document.getElementsByClassName('hero')[0].style.opacity = "0.5";
    clearBtn();
    localStorageSaving();
}

function deleteTodo(obj) {
    obj.parentNode.parentNode.removeChild(obj.parentNode);
}

function allDone() {
    if (val === true) {
        document.getElementsByClassName('hero')[0].style.opacity = "1";
    } else document.getElementsByClassName('hero')[0].style.opacity = "0.5";
    for (var j = 0; j < todosList.length; j++) {
        todosList[j].isDone = val;
    }
    for (var i = 0; i < document.getElementsByClassName('v').length; i++) {
        document.getElementsByClassName('v')[i].checked = val;
    }
    if (todosList.length > 0) {
        if (val === true) {
            numComplt = todosList.length;
            val = false;
        } else {
            val = true;
            numComplt = 0;
            document.getElementsByClassName('mainDiv')[0].style.display = "inline-block";
        }
    }
    clearBtn();
    localStorageSaving();
}

function showAll() {
    for (var j = 0; j < document.getElementsByClassName("newLine").length; j++) {
        document.getElementsByClassName('newLine')[j].style.display = "inline-block";
    }
    lastBtn = 1;
    localStorageSaving();
}

function show(val) {
    for (var j = 0; j < document.getElementsByClassName('v').length; j++) {
        if (document.getElementsByClassName('v')[j].checked == val)
            document.getElementsByClassName('v')[j].parentNode.style.display = "inline-block";
        else document.getElementsByClassName('v')[j].parentNode.style.display = "none";
    }
}

function showActive() {
    show(false);
    lastBtn = 2;
    localStorageSaving();
}

function showCompleted() {
    show(true);
    lastBtn = 3;
    localStorageSaving();
}

function clearDones() {
    numComplt = 0;
    todosList = todosList.filter(function(e) {
        return e.isDone == false;
    });
    for (var i = 0; i < document.getElementsByClassName('v').length; i++) {
        if (document.getElementsByClassName('v')[i].checked == true) {
            document.getElementsByClassName('v')[i].parentNode.parentNode.removeChild(document.getElementsByClassName('v')[i].parentNode);
            i--;
        }
    }
    if (i == 0)
        document.getElementsByClassName('mainDiv')[0].style.display = "none";
    clearBtn();
    document.getElementsByClassName('hero')[0].style.opacity = "0.5";
    localStorageSaving();
}

function localStorageSaving() {
    document.getElementsByClassName('amount_todos')[0].innerHTML = (todosList.length - numComplt).toString();
    if (todosList.length - numComplt == 1)
        document.getElementsByClassName('items')[0].innerHTML = "item";
    else document.getElementsByClassName('items')[0].innerHTML = "items";
    localStorage.setItem("saved_todos", JSON.stringify(todosList));
    localStorage["num"] = numComplt;
    if (todosList.length == 0)
        m = 0;
    localStorage["m_id"] = m;
    localStorage["l_btn"] = lastBtn;
}

function clearBtn() {
    if (numComplt > 0) {
        document.getElementsByClassName('clear')[0].style.visibility = "visible";
    } else document.getElementsByClassName('clear')[0].style.visibility = "hidden";
}

function changeToTxt(divId) {
    unShowX(divId);
    changing(divId, false, 'pVal', 'pVal2');
}

function changeToP(divId) {
    changing(divId, true, 'pVal2', 'pVal');
}

function changing(d_id, val, c1, c2) {
    document.getElementById(d_id).children[1].readOnly = val;
    document.getElementById(d_id).children[1].classList.remove(c1);
    document.getElementById(d_id).children[1].classList.add(c2);
    saveAfterChange(d_id);
}

function saveAfterChange(id) {
    for (var j = 0; j < todosList.length; j++) {
        if (todosList[j].key == id) {
            todosList[j].value = document.getElementById(id).children[1].value;
        }
    }
    localStorageSaving();
}

function showX(divId) {
    if (document.getElementById(divId).children[1].classList.contains('pVal'))
        document.getElementById(divId).children[2].style.visibility = 'visible';
}

function unShowX(divId) {
    document.getElementById(divId).children[2].style.visibility = 'hidden';
}