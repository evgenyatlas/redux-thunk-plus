import createCheck from './createCheck'

function createTakeEvery(clearAfterCall = false) {
    let checkMap = {}

    function takeEvery(actionType, callback) {
        if (actionType.pop && actionType.push)
            actionType.forEach(actionType => addCheckMap(checkMap, actionType, callback))
        else
            addCheckMap(checkMap, actionType, callback)
    }

    const checkCall = createCheck(checkMap, clearAfterCall)

    return [takeEvery, checkCall]
}

function addCheckMap(checkMap, actionType, callback) {
    checkMap[actionType] = !checkMap[actionType] ? [] : checkMap[actionType]
    checkMap[actionType].push(callback)
}

export default createTakeEvery