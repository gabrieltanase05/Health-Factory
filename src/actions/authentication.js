// Redux actions

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

export const setUser = (user) => {
    return {
        type: "SET_USER",
        value: user
    }
}

export const setLoading = (value) => {
    return {
        type: "SET_LOADING",
        value: value
    }
}
