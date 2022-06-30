package api

import (
	"net/http"
	"strconv"

	"github.com/gogf/gf/v2/container/gvar"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gctx"
	"github.com/sirupsen/logrus"

	"github.com/gorilla/websocket"
	"github.com/yongchengchen/gf-ws-terminal/app/model"
	"github.com/yongchengchen/gf-ws-terminal/app/service"
	"github.com/yongchengchen/gf-ws-terminal/library/response"
	"github.com/yongchengchen/gf-ws-terminal/library/utility"
)

var chans = make(map[string]chan bool)

var upGrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024 * 1024 * 10,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func getSshMachine(id int) *model.SshMachine {
	var (
		serverConfig *model.SshMachine
	)
	err := g.DB("sqlite").Model("machines").Where("id", id).Scan(&serverConfig)
	if err != nil {
		return nil
	}
	return serverConfig
}

func WsSsh(r *ghttp.Request) {
	var cols *gvar.Var = r.GetQuery("cols", 80)
	var rows *gvar.Var = r.GetQuery("rows", 40)

	logrus.Println(cols)
	logrus.Println(rows)

	var token *gvar.Var = r.Get("token")
	cid, err := wsAuth(token.String())

	if cid <= 0 {
		logrus.WithError(err).Println("disconnect")
		response.JsonExit(r, 404, err.Error())
	}

	config := getSshMachine(cid)

	wsConn, err := upGrader.Upgrade(r.Response.Writer, r.Request, nil)
	if err != nil {
		response.JsonExit(r, 500, "Fail to push")
	}

	defer wsConn.Close()
	client, err := service.NewSshClient(config)
	if response.WsHandleError(wsConn, err) {
		return
	}

	defer client.Close()
	// startTime := time.Now()
	ssConn, err := utility.NewSshConn(cols.Int(), rows.Int(), client)
	if response.WsHandleError(wsConn, err) {
		return
	}
	defer ssConn.Close()

	sws, err := model.NewLogicSshWsSession(cols.Int(), rows.Int(), true, client, wsConn)
	if response.WsHandleError(wsConn, err) {
		return
	}
	defer sws.Close()

	quitChan := make(chan bool, 3)
	chans[token.String()] = quitChan
	sws.Start(quitChan)
	go sws.Wait(quitChan)

	<-quitChan

	logrus.Println(config.Name, "quitChan Exit")
	// //保存日志

	// //write logs
	// xtermLog := model.SshLog{
	// 	StartedAt: startTime,
	// 	UserId:    userM.Id,
	// 	Log:       sws.LogString(),
	// 	MachineId: idx,
	// 	ClientIp:  cIp,
	// }
	// err = xtermLog.Create()
	if response.WsHandleError(wsConn, err) {
		return
	}
}

func wsAuth(token string) (int, error) {
	cx := gctx.New()

	m, _ := g.Cfg().Get(cx, "localmode", true)
	if m.Bool() {
		return strconv.Atoi(token)
	}

	if len(token) <= 0 {
		return 0, nil
	}
	var (
		ctx    = gctx.New()
		err    error
		result *gvar.Var
	)

	result, err = g.Redis().Do(ctx, "GET", token)
	if err != nil {
		return 0, err
	}
	return result.Int(), nil
}
