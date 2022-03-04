package main

import (
  "log"
  "net/http"
)

func main(){
  fs := http.FileServer(http.Dir("./frontend/dist"))
  http.Handle("/", fs)
  log.Panic(http.ListenAndServe(":3000", nil))
}


func handleError(err error)  {
  if err != nil {
    log.Panic(err)
  }
}
