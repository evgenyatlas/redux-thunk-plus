import createTake from './take'
import createTakeEvery from './takeEvery'
import createTakeOnce from './takeOnce'
import race from './race'

const effects = {
    race,
    take: null,
    takeEvery: null,
    takeOnce: null,
    dispatch: null,
    getState: null
}

function createThunkPlusMiddleware() {
    return ({ dispatch, getState }) => {

        const [take, checkCallTake] = createTake()
        const [takeEvery, checkCallTakeEvery] = createTakeEvery()
        const [takeOnce, checkCallTakeOnce] = createTakeOnce()

        const listCheck = [checkCallTake, checkCallTakeEvery, checkCallTakeOnce]

        effects.take = take
        effects.takeEvery = takeEvery
        effects.takeOnce = takeOnce
        effects.dispatch = dispatch
        effects.getState = getState

        return next => action => {
            if (typeof action === 'function')
                return action(dispatch, getState, effects)

            //including reducer
            const resultAfterAllMiddleware = next(action)

            listCheck.forEach(checkCall => checkCall(action))

            return resultAfterAllMiddleware
        }
    }
}

export default createThunkPlusMiddleware

export function applyEffects(func) {
    return func.constructor.name === 'AsyncFunction' ?
        async (...args) => func(effects, ...args)
        :
        (...args) => func(effects, ...args)
}

export function getEffects() {
    return effects
}