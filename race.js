function race(listPromise) {
    let results = Array(listPromise.length).fill(undefined)

    let resCallBack
    let rejCallBack
    const promise = new Promise((res, rej) => {
        resCallBack = (result, index) => {
            results[index] = result
            res(results)
        }
        rejCallBack = rej
    })

    listPromise.forEach((promise, index) =>
        promise
            .then(result => resCallBack(result, index))
            .catch(rejCallBack)
    )
    return promise
}

export default race