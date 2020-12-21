let range = {
    from: 1,
    to: 5,
  
    async *[Symbol.asyncIterator]() {
      for(let value = this.from; value <= this.to; value++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield value;
      }
    }
  };
  
  (async () => {
    for await (let value of range) {
      console.log(value); // 1, then 2, then 3, then 4, then 5
    }
  })();