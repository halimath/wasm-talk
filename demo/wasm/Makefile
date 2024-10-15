CC ?= emcc
CFLAGS ?= -Wall -O3 --no-entry

../public/quicksort.wasm: quicksort.c
	emcc $(CFLAGS) $< -o $@

.PHONY: clean
clean:
	rm -rf ../public/quicksort.wasm