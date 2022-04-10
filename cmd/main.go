package main

import (
	"github.com/RogerDurdn/ChatApp/pkg/service"
	"github.com/RogerDurdn/ChatApp/web"
)

func main() {
	server := web.NewServerHttp(service.NewCore())
	server.Run()
}
