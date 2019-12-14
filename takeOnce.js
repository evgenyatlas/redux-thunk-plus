import createTakeEvery from "./takeEvery";
import { moveProperty } from "../../utils";

function createTakeOnce() {
    // const result = moveProperty(
    //     createTakeEvery(true),
    //     'takeEvery',
    //     'takeOnce'
    // )
    // console.log(result)
    // return result
    return createTakeEvery(true)
}

export default createTakeOnce