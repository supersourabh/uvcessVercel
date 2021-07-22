import {compose ,combineReducers , applyMiddleware ,createStore} from "redux";
import thunk from "redux-thunk";
import { adminDeleteReducer, adminListReducer, crsReducer, loginReducer, materialReducer, materialSyllabusReducer, materialUploadReducer, memberAddReducer, membersReducer, problemsListReducer, problemsReducer, signupReducer, syllabusUploadReducer, viewReducer } from "./Reducers/AllReducers"

const studentInfo = localStorage.getItem('studentInfo')?JSON.parse(localStorage.getItem('studentInfo')): null;


const initialState = {
    studentLogin:{ studentInfo }
};


const reducer =combineReducers({
    studentLogin : loginReducer,
    studentRegister : signupReducer,
    material : materialReducer,
    syllabusMaterial:materialSyllabusReducer,
    crs : crsReducer,
    members : membersReducer,
    problems : problemsReducer,
    materialUpload:materialUploadReducer,
    syllabusUpload: syllabusUploadReducer,
    view : viewReducer,
    memberAdd :memberAddReducer,
    problemsList:problemsListReducer,
    adminList : adminListReducer,
    adminDelete : adminDeleteReducer,
})


const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const store = createStore(reducer,initialState ,ComposeEnhancers(applyMiddleware(thunk)) )

export default store