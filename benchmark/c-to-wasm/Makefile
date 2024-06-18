CC=emcc
CFLAGS=-Wall -O3

fib.js: ../c/fib.c
	$(CC) $(CFLAGS) -o $@ $<

.PHONY: clean
clean:
	rm -rf fib.js fib.wasm