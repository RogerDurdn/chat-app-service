let socket;
let connection = false;
let chat = $("#chat");

function sendMessage(){
    connect()
    let msg = {
        "clientId": "",
        "message": $("#message").val(),
    }
    socket.send(JSON.stringify(msg));
    $("#message").val('');
}

function showMessages(msg){
    let base = msg.clientId ? ">"+ msg.clientId: "";
    let msgToAdd = chat.val() +  " \n " + base +" - "+msg.message;
    chat.val(msgToAdd);
}

$( "#clear" ).click(function() {
    $("#chat").val('');
});

$( "#prefButton" ).click(function(e) {
    e.preventDefault();
    setPreferences();
    let pref = {
        "colorBack": $("#colorBack").val(),
        "colorText": $("#colorText").val(),
    }
    $.ajax({
        type: "POST",
        url: "/api/preferences",
        data: JSON.stringify(pref),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {alert(data)},
        failure: function (errMsg) {
            alert("error:"+errMsg);
        }
    });
});

$( "#loginButton" ).click(function(e) {
   e.preventDefault();
    console.log($("#userName").val());
    console.log($("#password").val());
    $("#loginForm").submit();
});


function connect(){
    let hostname = location.hostname;
    if(!connection){
        console.log("Opening connection...");
        let userN = $("#clientId").text();
        console.log(userN);
        socket = new WebSocket("ws://"+hostname+":9091/api/socket?clientId="+userN);
        socket.onopen = () => {
            console.log("Connection established!");
            $(".clientIdC").append(clientId);
            connection = true;
        }
    }else {
        console.log("connection already made");
    }
    socket.onmessage = (msg)=>{
        console.log("Receiving data!");
        showMessages(JSON.parse(msg.data));
    }
    return socket;
}

function setPreferences(){
 $("#chat").css({"background-color":$("#colorBack").val(), "color": $("#colorText").val()});
}
