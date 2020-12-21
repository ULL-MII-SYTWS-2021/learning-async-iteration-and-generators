#!/usr/bin/env node --no-warnings

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandled rejection; `sad` was not being awaited at the time it rejected')
})

async function main() { 
    try {
        const happy = new Promise((resolve)=>setTimeout(()=>resolve('happy'), 1000))
        const sad = new Promise((_,reject)=>setTimeout(()=>resolve('sad')))
        const promises = [happy, sad]
        for await(const item of promises) {
            console.log(item)
        }
    } catch (err) {
        console.log(`promise rejected or error occurred:`, err)
    }
}

main()