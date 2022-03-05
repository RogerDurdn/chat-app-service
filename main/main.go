package main

import (
  tm "ConfigView/thumbnail"
  "fmt"
  "github.com/gorilla/mux"
  "github.com/gorilla/websocket"
  "log"
  "net/http"
)

type Message struct {
  Greeting string `json:"greeting"`
}

var (
  wsUpgrade = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
  }
  wsConnection *websocket.Conn
)

func WsEndpoint(w http.ResponseWriter, r *http.Request)  {
  wsUpgrade.CheckOrigin = func(r *http.Request) bool {
    // validate the origin if needed
    return true
  }
  wsConnection, err := wsUpgrade.Upgrade(w, r, nil)
  if err != nil {
    log.Panic(err)
  }

  defer wsConnection.Close()
  for {
    var msg Message
    err := wsConnection.ReadJSON(&msg)
    handleError(err)
    fmt.Println("message received:", msg)

  }
}

func main(){
  router := mux.NewRouter()

  fs := http.FileServer(http.Dir("./frontend/dist"))
  router.HandleFunc("/api/thumbnail", tm.ThumbnailHandler)
  router.PathPrefix("/").Handler(http.StripPrefix("/", fs))
  router.HandleFunc("/socket", WsEndpoint)
  log.Println("server on")
  log.Panic(http.ListenAndServe(":3000", router))
}

func handleError(err error)  {
  if err != nil {
    log.Panic(err)
  }
}

