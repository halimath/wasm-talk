#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
unsigned long long fib(const unsigned int n) {
  if (n < 2) {
    return n;
  }

  unsigned long long a = 0;
  unsigned long long b = 1;

  unsigned long long tmp;

  for (unsigned int i = 2; i <= n; i++) {
    tmp = a + b;
    a = b;
    b = tmp;
  }

  return b;
  // if (n == 0) {
  //   return 0;
  // }

  // if (n < 3) {
  //   return 1;
  // }

  // return fib(n - 1) + fib(n - 2);
}