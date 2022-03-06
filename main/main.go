package main

import (
  tm "ConfigView/thumbnail"
  ws "ConfigView/websocket"
  "github.com/gorilla/mux"
  "log"
  "net/http"
)

func main(){
  router := mux.NewRouter()

  fs := http.FileServer(http.Dir("./dist"))
  router.HandleFunc("/api/thumbnail", tm.ThumbnailHandler)
  router.HandleFunc("/socket", ws.ChatConnection)
  router.PathPrefix("/").Handler(http.StripPrefix("/", fs))
  log.Println("server on"); log.Panic(http.ListenAndServe(":9090", router))
}