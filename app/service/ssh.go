package service

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"time"

	"github.com/mitchellh/go-homedir"
	"github.com/yongchengchen/gf-ws-terminal/app/model"
	"golang.org/x/crypto/ssh"
)

func NewSshClient(h *model.SshServerConfig) (*ssh.Client, error) {
	config := &ssh.ClientConfig{
		Timeout:         time.Second * 5,
		User:            h.User,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(), //不够安全
		//HostKeyCallback: hostKeyCallBackFunc(h.Host),
	}
	if h.Type == "password" {
		config.Auth = []ssh.AuthMethod{ssh.Password(h.Password)}
	} else {
		config.Auth = []ssh.AuthMethod{publicKeyAuthFunc(h.Key, h.Password)}
	}
	addr := fmt.Sprintf("%s:%d", h.Host, h.Port)
	c, err := ssh.Dial("tcp", addr, config)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func hostKeyCallBackFunc(host string) ssh.HostKeyCallback {
	hostPath, err := homedir.Expand("~/.ssh/known_hosts")
	if err != nil {
		log.Println("find known_hosts's home dir failed", err)
		return nil
	}
	file, err := os.Open(hostPath)
	if err != nil {
		log.Println("can't find known_host file:", err)
		return nil
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var hostKey ssh.PublicKey
	for scanner.Scan() {
		fields := strings.Split(scanner.Text(), " ")
		if len(fields) != 3 {
			continue
		}
		if strings.Contains(fields[0], host) {
			var err error
			hostKey, _, _, _, err = ssh.ParseAuthorizedKey(scanner.Bytes())
			if err != nil {
				log.Printf("error parsing %q: %v", fields[2], err)
			}
			break
		}
	}
	if hostKey == nil {
		log.Printf("no hostkey for %s,%v", host, err)
		return nil
	}
	return ssh.FixedHostKey(hostKey)
}

func publicKeyAuthFunc(kPath string, phraseKey string) ssh.AuthMethod {
	// var kPath1 string = "/Users/chen/workplace/aws/.configs/aws_test_account.pem"
	var kPath1 string = "/Users/chen/workplace/aws/.configs/aws_ec2_live_private.pem"
	keyPath, err := homedir.Expand(kPath1)
	if err != nil {
		log.Println("find key's home dir failed", err)
		return nil
	}

	key, err := ioutil.ReadFile(kPath1)
	if err != nil {
		log.Println("ssh key file read failed", keyPath)
		return nil
	}
	// CreateUserOfRole the Signer for this private key.
	signer, err := sshParsePrivateKey(key, phraseKey)
	if err != nil {
		log.Println("ssh key signer failed ", err)
		return nil
	}
	return ssh.PublicKeys(signer)
}

func sshParsePrivateKey(key []byte, phraseKey string) (ssh.Signer, error) {
	if len(phraseKey) > 0 {
		return ssh.ParsePrivateKeyWithPassphrase(key, []byte(phraseKey))
	}
	return ssh.ParsePrivateKey(key)
}

func runCommand(client *ssh.Client, command string) (stdout string, err error) {
	session, err := client.NewSession()
	if err != nil {
		//log.Print(err)
		return
	}
	defer session.Close()

	var buf bytes.Buffer
	session.Stdout = &buf
	err = session.Run(command)
	if err != nil {
		//log.Print(err)
		return
	}
	stdout = string(buf.Bytes())

	return
}
