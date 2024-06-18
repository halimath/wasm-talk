CC=emcc
CFLAGS=-Wall -O3 --no-entry

../public/fib.wasm: fib.c
	emcc $(CFLAGS) $< -o $@

.PHONY: clean
clean:
	rm -rf ../public/fib.wasm