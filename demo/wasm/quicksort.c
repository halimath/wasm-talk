#include <emscripten.h>

void swap(int *a, int *b)
{
  int temp = *a;
  *a = *b;
  *b = temp;
}

int partition(int arr[], int low, int high)
{
  int pivot = arr[high];
  int i = (low - 1);

  for (int j = low; j <= high - 1; j++)
  {
    if (arr[j] < pivot)
    {
      i++;
      swap(&arr[i], &arr[j]);
    }
  }
  swap(&arr[i + 1], &arr[high]);
  return (i + 1);
}

void quicksortlh(int arr[], int low, int high)
{
  if (low >= high)
  {
    return;
  }
  int pi = partition(arr, low, high);

  quicksortlh(arr, low, pi - 1);
  quicksortlh(arr, pi + 1, high);
}

EMSCRIPTEN_KEEPALIVE
void quicksort(const int len, int arr[])
{
  quicksortlh(arr, 0, len);
}