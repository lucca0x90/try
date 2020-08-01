<template>
  <div class="home">
    <b-row align-h="center">
        <b-col cols="6">
            <b-row align-v="center"  v-if="show"  class="welcome">
                <b-col>
                    <h3>Welcome to adopt pets</h3>
                    <b-button variant="outline-primary" @click="add()">Add a pet</b-button>
                </b-col>
            </b-row>
            <div v-else>
                <h2>Register</h2>
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group
                        id="input-group-1" label="Pet's Name:" label-for="input-1">
                        <b-form-input
                        id="input-1"
                        v-model="form.name"
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Pet's Age:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.age"
                        required
                        placeholder="Enter age"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Species" label-for="input-3">
                        <b-form-select
                        id="input-3"
                        v-model="form.species"
                        :options="species"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Gender" label-for="input-4">
                        <b-form-select
                        id="input-3"
                        v-model="form.gender"
                        :options="gender"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="Vaccination">
                        <b-form-radio-group v-model="form.vaccination" id="radio-group-1">
                            <b-form-radio v-model="form.vaccination" name="some-radios" value="Y">Yes</b-form-radio>
                            <b-form-radio v-model="form.vaccination" name="some-radios" value="N">No</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-form-group id="input-group-6" label="Sterilization">
                        <b-form-radio-group v-model="form.sterilization" id="radio-group-2">
                            <b-form-radio v-model="form.sterilization" name="some-radios" value="Y">Yes</b-form-radio>
                            <b-form-radio v-model="form.sterilization" name="some-radios" value="N">No</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger" class="reset">Reset</b-button>
                </b-form>
            </div>
        </b-col>
    </b-row>
    <p>Total number: {{ totalCount }}</p>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
      return {
          show:true,
          form: {
              name: '',
              age: '',
              gender: null,
              species: null,
              vaccination: '',
              sterilization: '',
          },
          gender: [{ text: 'Choose', value: null }, 'male', 'female'],
          species: [{ text: 'Choose', value: null }, 'cat', 'dog']
      }
  },
  computed: {
      ...mapGetters([
          'totalCount'
      ])
  },
  methods: {
      add() {
          this.show = false;
          console.log(totalCount)
      },
      ...mapActions([
          'addPet'
      ]),
      onSubmit(evt) {
          evt.preventDefault();
          const payload = {
              species: this.form.species + 's',
              pet: {
                  ...this.form,
                  species: this.form.species,
                  sterilization: this.form.sterilization === 'Y' ? 'yes' :
                                 this.form.sterilization === 'N' ? 'no' : '',
              }
          }
          this.addPet(payload);
        //   this.$store.commit('appendPet', payload);
          this.$router.push({ path: '/' + this.form.species + 's'});
      },
      onReset(evt) {
          evt.preventDefault();
          this.form = {
              name: '',
              age: '',
              gender: null,
              species: null,
              vaccination: '',
              sterilization: '',
          }
      }
  }
}
</script>

<style scoped>
.home {
    margin-top: 20px;
}
.welcome {
    height: calc(100vh - 240px);
}
.reset {
    margin-left: 10px;
}
</style>