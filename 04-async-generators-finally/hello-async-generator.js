async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield i;
    }
  }
  
  (async () => {
    let generator = generateSequence(1, 5);
    while (let value = await generator.next()) {
      console.log(value.value); // 1, then 2, then 3, then 4, then 5 (with delay between)
    } 
  })();