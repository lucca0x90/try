<template>
  <div class="about">
    <h1>Dogs</h1>
    <b-table :items="dogs">
      <template v-slot:cell(name)="data">
        <router-link :to="`/pet/dogs/${data.index}`">
            {{ data.value }}
        </router-link>
      </template>
    </b-table>
    <p>Dogs' number: {{ dogCount }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            dogs: state => state.dogs
        }),
        ...mapGetters([
            'dogCount'
        ])
    }
}
</script>