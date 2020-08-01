export default {
    totalCount: (state) => {
        return state.cats.length + state.dogs.length;
    },
    catCount: (state) => {
        return state.cats.length;
    },
    dogCount: (state) => {
        return state.dogs.length;
    },
}