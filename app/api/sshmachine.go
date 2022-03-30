package api

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gctx"
	"github.com/yongchengchen/gf-ws-terminal/app/model"
	"github.com/yongchengchen/gf-ws-terminal/library/response"
)

// 用户API管理对象
var MachineApi = new(machineApi)

type machineApi struct{}

// redis Get command
func (a *machineApi) GetRecords(r *ghttp.Request) {
	var serverConfigs []model.SshMachine
	err := g.DB("sqlite").Model("machines").Scan(&serverConfigs)

	if err != nil {
		response.JsonExit(r, 500, err.Error())
	}
	response.JsonExit(r, 200, "success", serverConfigs)
}

func (a *machineApi) GetRecord(r *ghttp.Request) {
	var (
		item *model.SshMachine
	)
	var id = r.Get("id")

	if err := g.DB("sqlite").Model("machines").Where("id", id).Scan(&item); err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	ret := item.Name + "(" + item.Host + ")"

	response.JsonExit(r, 200, "success", ret)
}

func (a *machineApi) InsertRecord(r *ghttp.Request) {
	var (
		data *model.SshMachine
	)
	if err := r.Parse(&data); err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	v, err := g.DB("sqlite").GetValue(gctx.New(), "select id from machines order by id desc limit 1")
	if err != nil {
		response.JsonExit(r, 400, err.Error())
	}
	data.Id = 1 + v.Uint()
	ret, err := g.DB("sqlite").Model("machines").Insert(data)
	if err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	response.JsonExit(r, 200, "success", ret)
}

func (a *machineApi) UpdateRecord(r *ghttp.Request) {
	var (
		data *model.SshMachine
	)
	if err := r.Parse(&data); err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	ret, err := g.DB("sqlite").Model("machines").Update(data, "id", data.Id)
	if err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	response.JsonExit(r, 200, "success", ret)
}

func (a *machineApi) DeleteRecord(r *ghttp.Request) {
	var (
		data *model.SshMachine
	)
	if err := r.Parse(&data); err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	ret, err := g.DB("sqlite").Model("machines").Delete("id", data.Id)
	if err != nil {
		response.JsonExit(r, 400, err.Error())
	}

	response.JsonExit(r, 200, "success", ret)
}
