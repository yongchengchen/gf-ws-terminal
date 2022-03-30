package model

import "time"

type SshMachine struct {
	Id        uint      `gorm:"primary_key" json:"id" form:"id"`
	Name      string    `json:"name" gorm:"type:varchar(50);unique_index"`
	Host      string    `json:"host" gorm:"type:varchar(50)"`
	Ip        string    `json:"ip" gorm:"type:varchar(80)"`
	Port      uint      `json:"port" gorm:"type:int(6)"`
	User      string    `json:"user" gorm:"type:varchar(20)"`
	Password  string    `json:"password,omitempty"`
	Key       string    `json:"key,omitempty"`
	Type      string    `json:"type" gorm:"type:varchar(20)"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
