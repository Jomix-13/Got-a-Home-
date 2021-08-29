import {setErrors} from './errors'

const GET_ALL_QUESTIONS = 'questions/getAlQuestions'
const ADD_ONE_QUESTION = 'questions/addOneQuestion'
const DELETE_ONE_QUESTION = 'questions/deleteOneQuestion'

const getAllQuestions = (questions) =>{
    return {
        type : GET_ALL_QUESTIONS,
        questions
    }
}
const addOneQuestion = (question) =>{
    return {
        type : ADD_ONE_QUESTION,
        question
    }
}
const deleteOneQuestion = (questionid) =>{
    return {
        type : DELETE_ONE_QUESTION,
        questionid
    }
}

export const fetchAllQuestions = () => async (dispatch) => {
    const res = await fetch('/api/question/')
    
    if(res.ok) {
        const questions = await res.json()
        dispatch(getAllQuestions(questions))
    }
}


export const fetchAddQuestion = (payload) => async (dispatch) => {
    console.log('THUNK 1', payload)
    const res = await fetch(`/api/question/add`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    const question = await res.json()
    
    if(res.ok) {
        console.log('THUNK 2', question)
        dispatch(addOneQuestion(question))
    } else {
        // const home = await res.json()
        console.log('THUNK 3 ERROR')
        dispatch(setErrors(question));
      }
}

export const fetchDeleteQuestion = (questionid) => async (dispatch) => {
    console.log('THUNK',questionid)
    const res = await fetch(`/api/question/${questionid}`,{
        method:'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    
    if(res.ok) {
        // const home = await res.json()
        dispatch(deleteOneQuestion(questionid))
    } 
}

const intialstate = {
    questions :[],
}

const questionReducer = (state = intialstate,action)=>{
    switch(action.type) {
        case GET_ALL_QUESTIONS:
            return { 
                ...state,
                ...action.questions
            }
        case ADD_ONE_QUESTION:
            // return {
            //     ...state,
            //     questions : [...state.questions,action.question]
            // }
            return { 
                ...state,
                questions: [...state.questions, action.question]
            }
        case DELETE_ONE_QUESTION:
            return {
                ...state,
                questions : [...state.questions.filter((question) => question.id !== action.questionid)]
            }
        // case EDIT_ONE_HOME:
        //     return {
        //         ...state,
        //         homes : [...state.homes.filter((home) => home.id !== action.home.id),action.home],
        //         home : action.home
        //     }
        default:
            return state
    }
}

export default questionReducer