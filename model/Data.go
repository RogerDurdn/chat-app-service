package model

type User struct {
	Id       int       `json:"id"`
	UserName string    `json:"userName" form:"userName"`
	Password string    `json:"password" form:"password"`
	Features []Feature `json:"features"`
}

type Group struct {
	Id       int       `json:"id" `
	Name     string    `json:"name" `
	Features []Feature `json:"features"`
}

type Feature struct {
	Key   string      `json:"key"`
	Value interface{} `json:"value"`
}

type Preference struct {
	ColorText string `json:"colorText" form:"colorText" binding:"required"`
	ColorBack string `json:"colorBack" form:"colorBack" binding:"required"`
}

func NewGpBasic(id int, name string) *Group {
	return &Group{
		Id:   id,
		Name: name,
		Features: []Feature{
			{Key: "textColor", Value: ""},
			{Key: "textBack", Value: ""},
		},
	}

}
