package service

import (
	"errors"
	"github.com/RogerDurdn/ChatApp/model"
	"github.com/go-resty/resty/v2"
	"log"
	"net/http"
	"strconv"
)

type Core struct {
	client *resty.Client
}

func NewCore() *Core {
	return &Core{resty.New()}
}

func (c *Core) FetchUser(user *model.User) (*model.User, error) {
	if userFetched, err := c.validateUser(user); err != nil {
		return userFetched, err
	} else {
		userFetched.Features = c.fetchPreferences(userFetched.Id, userFetched.UserName)
		return userFetched, nil
	}

}

func (c *Core) validateUser(user *model.User) (*model.User, error) {
	var userAuth model.User
	resp, err := c.client.R().SetResult(&userAuth).SetBody(user).Post("http://localhost:9092/api/user/auth")
	if err != nil {
		return nil, err
	}
	if resp.IsError() {
		return nil, errors.New("forbidden access")
	}
	return &userAuth, nil
}

func (c Core) fetchPreferences(id int, userName string) []model.Feature {
	var gp *model.Group
	resp, err := c.client.R().SetResult(&gp).Get("http://localhost:9093/api/gp/" + strconv.Itoa(id))
	if err != nil {
		log.Println("Cannot reach the configuration server: ", err)
		return make([]model.Feature, 0)
	}
	if resp.IsSuccess() || gp != nil {
		return gp.Features
	}
	if resp.StatusCode() == http.StatusNotFound {
		if resp, err := c.client.R().SetResult(gp).SetBody(model.NewGpBasic(id, userName)).
			Post("http://localhost:9093/api/gp"); err != nil || resp.IsSuccess() {
			return gp.Features
		}
	}
	return make([]model.Feature, 0)
}

func (c *Core) SavePreferences(m *model.Preference) {
	gp := model.Group{
		Id: 1, Name: "rosha", Features: []model.Feature{
			{Key: "colorText", Value: m.ColorText},
			{Key: "colorBack", Value: m.ColorBack},
		},
	}
	resp, err := c.client.R().SetBody(gp).Post("http://localhost:9093/api/gp")
	if err != nil || resp.IsError() {
		log.Printf("Error updating preferences: %v", err)
	}
}
