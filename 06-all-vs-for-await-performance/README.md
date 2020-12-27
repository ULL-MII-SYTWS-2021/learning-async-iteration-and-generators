## Comparing the Performance of Promise.all with for await

```
➜  learning-async-iteration-and-generators git:(main) ✗ node 06-all-vs-for-await-performance/all-vs-for-await-performance.js
promiseAll programmed rejection
promiseAll dorejecttrue: 118.024ms
unhandledRejection
[ 0, 1, 2 ]
promiseAll dorejectfalse: 404.030ms
0
1
2
forAwait dorejectfalse: 403.223ms
0
1
forAwait programmed rejection
forAwait dorejecttrue: 404.824ms
```

## See

* [Performance of Promise.all and for-await-of](https://stackoverflow.com/questions/51916636/performance-of-promise-all-and-for-await-of#:~:text=Under%20the%20assumption%20that%20all,loop)%20faster%20than%20using%20Promise.&text=Each%20time%20we%20access%20the,returned%20from%20the%20iterator%20method.)
* [Should I refrain from handling Promise rejection asynchronously?](https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously)