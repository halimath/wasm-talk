package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist/*
var files embed.FS

func main() {
	fsys, err := fs.Sub(files, "dist")
	if err != nil {
		panic(err)
	}
	http.Handle("/", http.FileServerFS(fsys))
	http.ListenAndServe(":8080", nil)
}
