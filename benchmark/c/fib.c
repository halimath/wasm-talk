#include <stdio.h>
#include <stdlib.h>

unsigned long long fib(const unsigned long long x)
{
    if (x == 0)
        return 0;
    if (x < 3)
        return 1;

    return fib(x - 1) + fib(x - 2);
}

int main(const int argc, const char **argv)
{
    if (argc < 2)
    {
        fprintf(stderr, "%s: missing argument\n", argv[0]);
        exit(1);
    }

    const int x = atoi(argv[1]);

    printf("fib(%d) = %llu\n", x, fib(x));
    return 0;
}