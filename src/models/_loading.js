export default {
    name: '_loadding',
    initialState: {
        status: false,
    },
    reducers: {
        update(state, data) {
            return { ...state, status: data }
        }
    },
}
