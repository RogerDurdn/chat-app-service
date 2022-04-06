package connection

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Message struct {
	ClientId string `json:"clientId"`
	Message  string `json:"message"`
}

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

func (c *Client) Read() {

	log.Println("client on reading")
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var mess Message
		_ = json.Unmarshal(p, &mess)
		message := Message{ClientId: c.ID, Message: mess.Message}
		c.Pool.Broadcast <- message
		log.Println("Message Received: %+v\n", message)
	}
}

func NewClient(id string, c *websocket.Conn, p *Pool) *Client {
	newClient := Client{
		ID:   id,
		Conn: c,
		Pool: p,
	}
	return &newClient
}

var (
	wsUpgrade = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

var pool *Pool

func ChatConnection(w http.ResponseWriter, r *http.Request) {

	wsUpgrade.CheckOrigin = func(r *http.Request) bool {
		// check the http.Request make sure it's OK to access
		return true
	}
	log.Println(r.URL.Query())
	clientId := r.URL.Query().Get("clientId")
	log.Println("creating a connection for:" + clientId)
	if pool == nil {
		pool = NewPool()
		pool.Start()
	}
	wsConnection, err := wsUpgrade.Upgrade(w, r, nil)
	if err != nil {
		log.Println("error connecting to websocket:", err)
	}
	client := NewClient(clientId, wsConnection, pool)
	log.Println("Register client")
	pool.Register <- client
	client.Read()
}
