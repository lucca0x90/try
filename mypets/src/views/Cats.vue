<template>
  <div class="about">
    <h1>Cats</h1>
    <b-table :items="cats">
      <template v-slot:cell(name)="data">
        <router-link :to="`/pet/cats/${data.index}`">
            {{ data.value }}
        </router-link>
      </template>
    </b-table>
    <p>Cats' number: {{catCount}}</p>
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
        ...mapState([
            'cats'
        ]),
        ...mapGetters([
            'catCount'
        ])
    }
}
</script>