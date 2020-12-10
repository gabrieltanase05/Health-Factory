
export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        value: token
    }
}

export const setTrainer = (isTrainer) => {
    return {
        type: "SET_TRAINER",
        value: isTrainer
    }
}

export const addUser = (user) => {
    return {
        type: "ADD_USER",
        value: {...user}
    }
}