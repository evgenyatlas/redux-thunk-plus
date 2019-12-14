import createCheck from './createCheck'

function createTake() {
    let checkCallMap = {}

    function take(actionType) {

        checkCallMap[actionType] = !checkCallMap[actionType] ? [] : checkCallMap[actionType]

        let resCallBack
        const promise = new Promise(res => {
            resCallBack = action => res(action)
        })

        checkCallMap[actionType].push(resCallBack)

        return promise
    }

    const checkCall = createCheck(checkCallMap, true)

    return [take, checkCall]
}

export default createTake