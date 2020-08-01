export default {
    appendPet: (state, {species, pet}) => {
        state[species].push(pet)
        console.log(state)
        // state.cats.push(newPet);
    }
}