package main

import (
	"fmt"
	"os"
	"strconv"
)

func fib(x int) int {
	if x == 0 {
		return 0
	}

	if x < 3 {
		return 1
	}

	return fib(x-1) + fib(x-2)
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintf(os.Stderr, "%s: missing argument\n", os.Args[0])
		os.Exit(1)
	}

	x, err := strconv.Atoi(os.Args[1])
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s: invalid number: %s\n", os.Args[0], os.Args[1])
		os.Exit(2)
	}

	fmt.Printf("fib(%d) = %d\n", x, fib(x))
}
