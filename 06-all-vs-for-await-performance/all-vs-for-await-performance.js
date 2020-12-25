const fetch = function(ms, value) {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
       if (value === 2) return reject(value);
       resolve(value);
     }, ms);
  });
}

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => {});
process.on('unhandledRejection', error => {
  console.log('unhandledRejection');
});

let ms = ["400", "200", "100"];

const promiseAll = async () => {
  console.time('promiseAll');
  try {
    let res = await Promise.all(ms.map((s,i) => fetch(s, i)));
    console.log(res);
  } catch(e) {
    console.log('promiseAll programmed rejection')
  } finally {
    console.timeEnd('promiseAll');
  }
};

const forAwait = async () => {
  console.time('forAwait')
  try {
    for await (let data of ms.map((ms, i) => fetch(ms, i))) {
      console.log(data);
    }
  } catch(e) {
    console.log('forAwait programmed rejection')
  } finally {
    console.timeEnd('forAwait');
  }
};


promiseAll();
forAwait();


