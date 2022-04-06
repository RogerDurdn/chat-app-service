let socket;
let connection = false;
let chat = $("#chat");

function sendMessage(){
    let msg = {
        "clientId": "",
        "message": $("#message").val(),
    }
    socket.send(JSON.stringify(msg));
}

function showMessages(msg){
    let base = msg.clientId ? ">"+ msg.clientId: "";
    let msgToAdd = chat.val() +  " \n " + base +" - "+msg.message;
    chat.val(msgToAdd);
}

$( "#clear" ).click(function() {
    $("#chat").val('');
});



function connect(){
    let hostname = location.hostname;
    if(!connection){
        console.log("Opening connection...");
        let clientId = $("#clientId").val();
        socket = new WebSocket("ws://"+hostname+":8181/api/socket?clientId="+clientId);
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

