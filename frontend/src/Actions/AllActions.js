import Axios from "axios";

import {
    ADMIN_DELETE_FAIL,
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_SUCCESS,
    ADMIN_LIST_FAIL,
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    CRS_FAIL,
    CRS_REQUEST,
    CRS_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    MATERIAL_FAIL,
    MATERIAL_REQUEST,
    MATERIAL_SUCCESS,
    MATERIAL_SYLLABUS_FAIL,
    MATERIAL_SYLLABUS_REQUEST,
    MATERIAL_SYLLABUS_SUCCESS,
    MATERIAL_UPLOAD_FAIL,
    MATERIAL_UPLOAD_REQUEST,
    MATERIAL_UPLOAD_SUCCESS,
    MEMBERS_FAIL,
    MEMBERS_REQUEST,
    MEMBERS_SUCCESS,
    MEMBER_ADD_FAIL,
    MEMBER_ADD_REQUEST,
    MEMBER_ADD_SUCCESS,
    PROBLEMS_FAIL,
    PROBLEMS_LIST_FAIL,
    PROBLEMS_LIST_REQUEST,
    PROBLEMS_LIST_SUCCESS,
    PROBLEMS_REQUEST,
    PROBLEMS_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    STUDENT_SIGN_OUT,
    SYLLABUS_UPLOAD_FAIL,
    SYLLABUS_UPLOAD_REQUEST,
    SYLLABUS_UPLOAD_SUCCESS,
    VIEW_FAIL,
    VIEW_REQUEST,
    VIEW_SUCCESS
} from "../Constants/AllConstants"

export const loginAction = (name, rollNo) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: { name, rollNo } });

    try {
        const inpdata = { name, rollNo }

        const { data } = await Axios.post("/api/user/login", inpdata)


        dispatch({ type: LOGIN_SUCCESS, payload: data });


        localStorage.setItem('studentInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}



export const signupAction = (studentInfo) => async (dispatch) => {

    try {
        dispatch({ type: SIGNUP_REQUEST, payload: studentInfo });



        const { data } = await Axios.post("/api/user/signup", studentInfo)


        dispatch({ type: SIGNUP_SUCCESS, payload: data });

        dispatch({ type: LOGIN_SUCCESS, payload: data });

        localStorage.setItem('studentInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({ type: SIGNUP_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const signout = () => async (dispatch) => {

    localStorage.removeItem("studentInfo")

    dispatch({ type: STUDENT_SIGN_OUT })
}


export const materialAction = (sem, branch, count) => async (dispatch, getState) => {
    dispatch({ type: MATERIAL_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.get(`/api/material/notes/${sem}/${branch}/${count}`)


        dispatch({ type: MATERIAL_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: MATERIAL_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const syllabusAction = (type, sem, branch) => async (dispatch, getState) => {
    dispatch({ type: MATERIAL_SYLLABUS_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.get(`/api/material/syllabus/${type}/${sem}/${branch}`)


        dispatch({ type: MATERIAL_SYLLABUS_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: MATERIAL_SYLLABUS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const crsAction = () => async (dispatch, getState) => {
    dispatch({ type: CRS_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.get(`/api/connect//crs`)


        dispatch({ type: CRS_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: CRS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const membersAction = () => async (dispatch, getState) => {
    dispatch({ type: MEMBERS_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.get(`/api/connect/members`)


        dispatch({ type: MEMBERS_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: MEMBERS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const problemsAction = (problem) => async (dispatch, getState) => {
    dispatch({ type: PROBLEMS_REQUEST, payload: problem });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/connect/problems`, problem)


        dispatch({ type: PROBLEMS_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: PROBLEMS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const materialUploadAction = (formData) => async (dispatch, getState) => {
    dispatch({ type: MATERIAL_UPLOAD_REQUEST, payload: formData });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/material/create/studyMaterial`, formData)


        dispatch({ type: MATERIAL_UPLOAD_SUCCESS });


    } catch (error) {
        dispatch({ type: MATERIAL_UPLOAD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const syllabusUploadAction = (syllabus) => async (dispatch, getState) => {
    dispatch({ type: SYLLABUS_UPLOAD_REQUEST, payload: syllabus });
    console.log(syllabus);
    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/material/create/syllabusUpload`, syllabus)


        dispatch({ type: SYLLABUS_UPLOAD_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: SYLLABUS_UPLOAD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const viewAction = (id) => async (dispatch, getState) => {
    dispatch({ type: VIEW_REQUEST, payload: id });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/material/view/${id}`, id)


        dispatch({ type: VIEW_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: VIEW_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const membersAddAction = (memberInfo) => async (dispatch, getState) => {
    dispatch({ type: MEMBER_ADD_REQUEST, payload: memberInfo });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/admin/membersAdd`, memberInfo)


        dispatch({ type: MEMBER_ADD_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: MEMBER_ADD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const problemListAction = () => async (dispatch, getState) => {
    dispatch({ type: PROBLEMS_LIST_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/admin/problemsList`)


        dispatch({ type: PROBLEMS_LIST_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: PROBLEMS_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}



export const adminListAction = (list, count) => async (dispatch, getState) => {
    dispatch({ type: ADMIN_LIST_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/admin/adminList/${list}/${count}`)


        dispatch({ type: ADMIN_LIST_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: ADMIN_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const adminDeleteAction = (id) => async (dispatch, getState) => {
    dispatch({ type: ADMIN_DELETE_REQUEST });

    try {
        const { studentLogin: { studentInfo } } = getState();
        const authAxios = Axios.create({
            baseURl: "",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`
            }

        })

        const { data } = await authAxios.post(`/api/admin/delete/${id}`)


        dispatch({ type: ADMIN_DELETE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: ADMIN_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


