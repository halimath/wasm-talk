GO=go

fib: main.go
	$(GO) build -o $@ $<

fib.wasm: main.go
	GOOS=wasip1 GOARCH=wasm $(GO) build -o $@ $<

fib.tiny.wasm: main.go
	tinygo build -o $@ -target=wasi $<