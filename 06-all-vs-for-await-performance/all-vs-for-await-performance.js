const fetch = function(ms, value, tryreject) {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
       if (tryreject && (value === 2)) return reject(value);
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

const promiseAll = async (doreject) => {
  console.time('promiseAll doreject'+doreject);
  try {
    let res = await Promise.all(ms.map((s,i) => fetch(s, i, doreject)));
    console.log(res);
  } catch(e) {
    console.log('promiseAll programmed rejection')
  } finally {
    console.timeEnd('promiseAll doreject'+doreject);
  }
};

const forAwait = async (doreject) => {
  console.time('forAwait doreject'+doreject)
  try {
    for await (let data of ms.map((ms, i) => fetch(ms, i, doreject))) {
      console.log(data);
    }
  } catch(e) {
    console.log('forAwait programmed rejection')
  } finally {
    console.timeEnd('forAwait doreject'+doreject);
  }
};


for(let doreject of [false, true]) {
  promiseAll(doreject);
  forAwait(doreject);
}



