package web

import (
	"github.com/RogerDurdn/ChatApp/model"
	cn "github.com/RogerDurdn/ChatApp/pkg/connection"
	"github.com/RogerDurdn/ChatApp/pkg/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type serverHttp struct {
	core *service.Core
}

func NewServerHttp(core *service.Core) *serverHttp {
	return &serverHttp{core: core}
}

func (s *serverHttp) Run() {
	r := gin.Default()

	r.LoadHTMLGlob("templates/*.html")
	r.Static("/assets", "templates/assets")
	//r.Static("/images", "templates/images")

	static := r.Group("/")
	static.GET("/", s.getIndex)
	static.POST("/login", s.loginUser)

	api := r.Group("/api")
	api.GET("/socket", s.exchangeSocket)
	api.POST("/preferences", s.savePreferences)

	log.Println("server on on port 9091")
	log.Panic(r.Run(":9091"))
}

func (s *serverHttp) loginUser(c *gin.Context) {
	var user model.User
	if err := c.ShouldBind(&user); err != nil {
		c.JSON(http.StatusBadRequest, "bad request")
		return
	}
	if user, err := s.core.FetchUser(&user); err != nil {
		c.HTML(http.StatusUnauthorized, "login.html", nil)
		return
	} else {
		c.HTML(http.StatusOK, "index.html", gin.H{"userName": user.UserName,
			"colorText": user.Features[0].Value,
			"colorBack": user.Features[1].Value,
		})
	}

}

func (s *serverHttp) getIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", nil)
}

func (s *serverHttp) exchangeSocket(c *gin.Context) {
	log.Println("hitting the socket")
	cn.ChatConnection(c.Writer, c.Request)
}

func (s *serverHttp) savePreferences(c *gin.Context) {
	var preferences model.Preference
	if err := c.ShouldBind(&preferences); err != nil {
		c.JSON(http.StatusBadRequest, "bad request")
		return
	}
	s.core.SavePreferences(&preferences)
	c.JSON(http.StatusOK, "preferences updated")
}
