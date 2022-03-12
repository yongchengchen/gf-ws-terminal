package boot

import (
	_ "github.com/yongchengchen/gf-ws-terminal/packed"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/swagger"
)

// 用于应用初始化。
func init() {
	s := g.Server()
	s.Plugin(&swagger.Swagger{})
}
