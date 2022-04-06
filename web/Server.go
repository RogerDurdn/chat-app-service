package web

import (
	cn "github.com/RogerDurdn/ChatApp/pkg/connection"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func Serve() {
	r := gin.Default()

	r.LoadHTMLGlob("templates/*.html")
	r.Static("/assets", "templates/assets")
	//r.Static("/images", "templates/images")

	static := r.Group("/")
	static.GET("/", getIndex)

	api := r.Group("/api")
	api.GET("/socket", exchangeSocket)

	log.Println("server on on port 8181")
	log.Panic(r.Run(":8181"))
}

func getIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func exchangeSocket(c *gin.Context) {
	log.Println("hitting the socket")
	cn.ChatConnection(c.Writer, c.Request)
}
