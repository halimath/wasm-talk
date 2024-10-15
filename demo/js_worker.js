function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...quicksort(left), ...middle, ...quicksort(right)];
}

onmessage = (evt) => {
    const data = evt.data
    console.log(`js_worker: Received message to sort array of length ${data.length}`)
    const start = new Date()
    quicksort(data)
    const end = new Date()
    
    console.log(`js_worker: sorting finished; sending back result`);
    postMessage({
        start: start,
        end: end,
    })
  }