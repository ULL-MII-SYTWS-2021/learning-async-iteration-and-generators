function doTask1(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 100)
    })
}

function doTask2(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+2), 100)
    })
}

function doTask3(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+3), 100)
    })
}

function* init(arg) {
    const res1 = yield doTask1(arg);
    console.log(res1);
    
    const res2 = yield doTask2(res1);
    console.log(res2);

    const res3 = yield doTask3(res2);
    console.log(res3);

    return res3;
}

function runner(genFun, arg) {
   const itr = genFun(arg);

   function run(arg) {
      const result = itr.next(arg);

      if (result.done) 
        return result.value;
      else
        return Promise.resolve(result.value).then(run)
   }

   return run;
}

const doIt = runner(init, 3);
doIt();