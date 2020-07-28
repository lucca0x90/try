<template>
  <div id="app">
      <b-container>
          <div class="right">
            <p class="count">
                    Counter: {{ numCorrect }}/{{ numTotal }}
            </p>
            <b-button variant="outline-secondary" @click="restart()">Restart</b-button>
          </div>
          <b-jumbotron class="textalign">
              <template v-slot:header>Q & A</template>

            <div v-if="questions.length != 0">
              <h2>{{ questions[id].question }}</h2>
              <hr class="my-4">

              <h5>
                  <b-list-group>
                    <b-list-group-item 
                        v-for="(answer, index) in answers" :key="index" 
                        @click="selectedAnswer(index)" 
                        :class="answersClass(index)" 
                        >
                        {{ answer }}
                    </b-list-group-item>
                  </b-list-group>
              </h5>
            </div>

              <b-button variant="primary" @click="submit()" :disabled="subAnswer">Submit</b-button>
              <b-button variant="success" class="next" @click="next()" :disabled = "useless">Next</b-button>
          </b-jumbotron>
      </b-container>
  </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            id: 0,
            questions: [],
            answers: [],
            shuffleAnswers: [],
            useless: true,
            selectedIndex: null,
            correctIndex: null,
            subAnswer:false,
            numCorrect: 0,
            numTotal: 0,
        }
    },
    components: {
    },
    mounted() {
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple',{
            method: 'get'
        })
        .then((resp) => {
            //resp.status  200
            return resp.json();
        })
        .then((data) => {
            //   console.log(data.results);
            this.questions = data.results;
            this.getAnswers();
            this.shuffleAnswer();
        })
    },
    watch: {
        watcher() {
            this.selectedAnswer();
        }
    },
    computed: {
    },
    methods: {
        getAnswers() {
            this.answers = [...this.questions[this.id].incorrect_answers];
            this.answers.push(this.questions[this.id].correct_answer);
            console.log(this.answers)
            return this.answers;
        },
        //会改变原answers
        shuffleAnswer() {
            var shuffle = require('shuffle-array');
            this.shuffleAnswers = shuffle(this.answers);
            this.correctIndex = this.shuffleAnswers.indexOf(this.questions[this.id].correct_answer);
            console.log(this.correctIndex);
        },
        //id=5, next disabled, 报错出在id为5时，问题没有，
        //id=4，不能点击submit
        next() {
            this.useless = true;
            this.subAnswer = false;
            this.selectedIndex = null;
            if (this.id < 5) {
                this.id++;
                if (this.id == 5) {
                    this.useless = true;
                    this.subAnswer = true;
                    alert('Congratulations, you have completed all the questions！🎉');
                    this.id--;
                    return ;
                }
                this.getAnswers();
                this.shuffleAnswer();
                console.log(this.id, this.useless);
            }
        },
        selectedAnswer(index) {
            this.selectedIndex = index;
            console.log(this.selectedIndex)
        },
        answersClass(index) {
            let answerclass = '';
            if (!this.subAnswer && index === this.selectedIndex) {
                answerclass = 'select';
            } else if (this.subAnswer && index === this.correctIndex ) {
                answerclass = 'correct';
                console.log('classcorrect')
            } else if(this.subAnswer && index === this.selectedIndex && index !== this.correctIndex) {
                answerclass = 'incorrect';
                console.log('classincorrect')
            }
            return answerclass;
        },
        submit() {
            this.subAnswer = true;
            if (this.selectedIndex === this.correctIndex) {
                this.numCorrect++;
                }
            this.numTotal++;
            this.useless = false;
        },
        //存下做过的答案，再做一遍
        //现在的我等级不够，再过段时间
        restart() {
            console.log('Practicing...')
        }
    }
}
</script>

<style scoped>
.textalign {
    text-align: center;
}
.right {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}
.count {
    padding-top: 20px;
    margin-bottom: 0;
}
.next {
    margin-left: 5px;
}
.list-group-item:hover{
    background-color:lightgray;
}
.select {
    background-color: lightblue !important;
}
.correct {
    background-color: lightgreen;
}
.incorrect {
    background-color: lightcoral;
}
</style>
