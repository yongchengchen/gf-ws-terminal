package router

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/yongchengchen/gf-ws-terminal/app/api"
)

func init() {
	s := g.Server()
	s.BindHandler("/ws/:token", api.WsSsh)

	// s.BindHandler("/ws", func(r *ghttp.Request) {
	// 	ws, err := r.WebSocket()
	// 	if err != nil {
	// 		// glog.Error(err)
	// 		fmt.Print(err)
	// 		r.Exit()
	// 	}
	// 	for {
	// 		msgType, msg, err := ws.ReadMessage()
	// 		if err != nil {
	// 			return
	// 		}

	// 		if err = ws.WriteMessage(msgType, []byte("echo")); err != nil {
	// 			return
	// 		}
	// 		if err = ws.WriteMessage(msgType, msg); err != nil {
	// 			return
	// 		}
	// 	}
	// })
	s.SetServerRoot(gfile.MainPkgPath())
	s.SetPort(8199)
}
