import axios from 'axios';

const initState = {
  list: []
}

const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const TO_DELETE = "TO_DELETE";
const TO_COMPLETE = "TO_COMPLETE";

const reducer = (state = initState, action) => {
  switch(action.type) {
    case GET_TASKS + '_FULFILLED': 
      return {...state, list: action.payload}
      case ADD_TASK + '_FULFILLED': 
      console.log(action.payload)
      return {...state, list: [...state.list, action.payload]}
      // case TO_DELETE + '_FULFILLED':
      //   return {...state, list: action.payload}
      case TO_COMPLETE:
      return {...state, list: action.payload}
      default:
      return state;
  }
}

export const getList = (list) => {
  let tasks = axios.get('https://practiceapi.devmountain.com/api/tasks')
    .then(res => {
      console.log(res.data)
      return res.data
    })
  return {
    type: GET_TASKS,
    payload: tasks
  }
}

export const addTask = (task) => {
  let tasks = axios.post('https://practiceapi.devmountain.com/api/tasks', task)
    .then(res => {
      return res.data;
    })
  return {
    type: ADD_TASK,
    payload: tasks
  }
}

// export const toDelete = (id) => {
//   //why can't access to state from here?
//   axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
//   // return {
//   //   type: TO_DELETE,
//   //   payload: list
//   // }
// }

export const toComplete = (list) => {
  return {
    type: TO_COMPLETE,
    payload: list
  }
}

export default reducer;











// import axios from 'axios';

// const initState = {
//   list: []
// }

// const ADD_TASK = "ADD_TASK";
// const TO_DELETE = "TO_DELETE";
// const TO_COMPLETE = "TO_COMPLETE";

// const reducer = (state = initState, action) => {
//   switch(action.type) {
//     case ADD_TASK: 
//       return {...state, list: [...state.list, action.payload]};
//       case TO_DELETE:
//         return {...state, list: action.payload}
//       case TO_COMPLETE:
//       return {...state, list: action.payload}
//       default:
//       return state;
//   }
// }

// export const getList = (list) => {
//   return {
//     type: ADD_TASK,
//     payload: list
//   }
// }

// export const toDelete = (list) => {
//   //why can't access to state from here?

//   return {
//     type: TO_DELETE,
//     payload: list
//   }
// }

// export const toComplete = (list) => {
//   return {
//     type: TO_COMPLETE,
//     payload: list
//   }
// }

// export default reducer;