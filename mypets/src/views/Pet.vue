<template>
    <div class="detail">
        <!-- <h3>{{$route.params.species}}</h3>
        <h3>{{$route.params.id}}</h3> -->
        <!-- <h3>{{name}}</h3> -->
        <h4>Pet's name: {{ pets.name }}</h4>
        <h5>age: {{ pets.age }}</h5>
        <h5>gender: {{ pets.gender }}</h5>
        <h5>vaccination: {{ pets.vaccination }}</h5>
        <h5>sterilization: {{ pets.sterilization }}</h5>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            // name: undefined,
            pets: {}
        }
    },
    computed: {
        ...mapState([
            'dogs',
            'cats',
        ]),
    },
    mounted() {
        //得到一个pet的对象
        const pet = this.$route.params.species;
        if (pet === 'cats') {
            return this.pets = this.cats[this.$route.params.id];
        }else {
            return this.pets = this.dogs[this.$route.params.id];
        }
        //const anmial = this[this.$route.params.species][this.$route.params.id];
        //return anmial;
    }
    //得到猫咪的具体
    // mounted() {
    //     if (this.$route.params.species === 'cats') {
    //         const cat = this.cats[this.$route.params.id]
    //         if (cat) {
    //             this.name = cat.name;
    //         }
    //     }
    //     console.log(this.dogs)
    // }
}
</script>

<style scoped>
.detail {
    text-align: left;
    margin-top: 20px;
}
</style>