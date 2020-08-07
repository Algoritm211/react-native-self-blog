import {createStore, combineReducers} from 'redux'
import {postReducer} from './reducers/postReducers'


const rootReducer = combineReducers({
    post: postReducer
})



export default createStore(rootReducer)