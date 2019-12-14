function createCheck(listCallback, clearAfterCall = false) {
    return action => {
        if (listCallback[action.type] && listCallback[action.type].length > 0) {
            listCallback[action.type].forEach(callback => callback(action))
            if (clearAfterCall) listCallback[action.type] = []
        }
        listCallback['*'] && listCallback['*'].forEach(callback => callback(action))
    }
}

export default createCheck