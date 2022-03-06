<template>

  <div class="row">
    <div class="col-md-6 offset-md-3 py-5">
      <h1>Chat</h1>

      <br>
      <div v-if="connectionOn">
        <h3>Connected like: {{clientId}}</h3>
      </div>

      <form :action="connect" @click.prevent="onSubmit">
        <input v-model="clientId" type="text" style="width: 88px;" >
        <input  type="submit" value="Connect" @click="connect">
      </form>

      <br>
      <div style="">
        <h3>Messages</h3>
        <button @click="clear">Clear</button>
        <p style="white-space: pre-line; background-color: slategrey; "> {{ rcvMessage }} </p>
        >{{clientId}} - {{message}}
      </div>
      <form :action="sendMessage" @click.prevent="onSubmit">
        <input v-model="message" type="textarea" name="">
        <input  :disabled="!connectionOn" type="submit" value="Send" @click="sendMessage">
      </form>
    </div>
  </div>

</template>

<script>
export default {
  name: "App",
  data(){
    return {
      clientId:"",
      message:"",
      socket: null,
      rcvMessage: "",
      showMessage: false,
      connectionOn: false,
      fullText: "",
    }
  },
  mounted() {
  },
  methods: {
    sendMessage(){
      let msg = {
        "clientId": "",
        "message": this.message
      }
      this.message = ""
      this.socket.send(JSON.stringify(msg));
    },
    showMessages(msg){
      let resp = JSON.parse(msg.data)
      let base = resp.clientId ? ">"+ resp.clientId: "";
      this.rcvMessage += base +" - "+resp.message + " \n "
      this.showMessage = true
    },
    connect(){

      console.log("Opening connection...");
      let hostname = location.hostname;
      this.socket = new WebSocket("ws://"+hostname+":9090/socket?clientId="+this.clientId)
      this.socket.onopen = () => {
        console.log("Connection established!");
        this.connectionOn = true;
      }
      this.socket.onmessage = (msg)=>{
        this.showMessages(msg)
      }

    },
    clear() {
      this.rcvMessage = ""
    }
  },
}
</script>
