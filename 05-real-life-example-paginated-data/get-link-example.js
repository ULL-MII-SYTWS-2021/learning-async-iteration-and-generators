const fetch = require('node-fetch');

const main = async function() {
  const res = await fetch('https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/commits')
   // See https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
  const link = res.headers.get('Link')
  console.log("link: ",link) // <https://api.github.com/repositories/208814568/commits?page=2>; rel="next", <https://api.github.com/repositories/208814568/commits?page=61>; rel="last"
  const m = link.match(/<(.*?)>; rel="next", <(.*?)>; rel="last"/);

  console.log('next: ', m[1])
  console.log('last: ', m[2])

  const json = await res.json()

  //console.log(JSON.stringify(json[0].commit, null, 2))
  console.log(json.length) // 30
}

main();