<template>
  <div id="app">
      <h1>Calculator</h1>
      <div class="calculator">
          <div id="display"><span>{{ display || oldDisplay ||'0' | displayFilter }}</span></div>
          <div class="multiple" @click="allClear()">AC</div>
          <div class="multiple" @click="negative()">+/-</div>
          <div class="multiple" @click="precent()">%</div>
          <div class="sign light" @click="divide()">÷</div>
          <div class="number light" @click="number('7')">7</div>
          <div class="number light" @click="number('8')">8</div>
          <div class="number light" @click="number(9)">9</div>
          <div class="sign light" @click="multiply()">×</div>
          <div class="number light" @click="number('4')">4</div>
          <div class="number light" @click="number('5')">5</div>
          <div class="number light" @click="number('6')">6</div>
          <div class="sign light" @click="minus()">-</div>
          <div class="number light" @click="number('1')">1</div>
          <div class="number light" @click="number('2')">2</div>
          <div class="number light" @click="number('3')">3</div>
          <div class="sign light" @click="plus()">+</div>
          <div class="zero light" @click="zero('0')">0</div>
          <div class="number light" @click="point('.')">.</div>
          <div class="sign light" @click="equal()"><span>=</span></div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
      return {
          display: '',
          oldDisplay: '',
          opeartion: null,
          open: 'off',
      }
  },
  methods: {
      allClear() {
          this.display = '';
          this.oldDisplay = '';
      },
      negative() {
          if (this.display.toString().indexOf('-') == -1) {
              this.display = '-' + this.display;
          }else {
              this.display = this.display.toString().slice(1);
              console.log(this.display)
          }
      },
      precent() {
          this.display = parseFloat(this.display / 100);
      },
      number(n) {
          if (this.display.toString().slice(0,1) === '0' && this.display.toString().indexOf('.') == -1){
              this.display = '';
          }
          this.display += n;
          this.open = 'on';
        //   setTimeout(
        //       this.open = 'off'
        //   , 1000);
        // setTimeout(() => {
        //     this.open = 'off';
        // }, 1000);
      },
      zero(n) {
          if (this.display.slice(0,1) === '0') {
              this.display = '';
          } else {
              this.display += n;
          }
      },
      point(n) {
          if (this.display.toString().indexOf('.') == -1) {
              this.display += n;
          }
          if (this.display.toString().slice(0,1) === '.') {
              this.display = '0' + this.display;
          }

      },
      //运算
      divide() {
          this.oldDisplay = this.display;
          this.display = '';
          this.opeartion = 'div';
          },
      multiply() {
          this.oldDisplay = this.display;
          this.display = '';
          this.opeartion = 'mul';
          },
      minus() {
          this.oldDisplay = this.display;
          this.display = '';
          this.opeartion = 'min';
          },
      plus() {
          this.oldDisplay = this.display;
          this.display = '';
          this.opeartion = 'plu';
          },
      equal() {
          switch (this.opeartion) {
              case 'div':
                  this.display = parseFloat(this.oldDisplay) / parseFloat(this.display);
                  break;
              case 'mul':
                  this.display = parseFloat(this.oldDisplay) * parseFloat(this.display);
                  break;
              case 'min':
                  this.display = parseFloat(this.oldDisplay) - parseFloat(this.display);
                  break;
              case 'plu':
                  this.display = parseFloat(this.oldDisplay) + parseFloat(this.display);
                  break;
          }
          console.log(this.display, 'old:'+ this.oldDisplay)
      }
  },
  filters: {
      displayFilter(display) {
          return display.toString().slice(0, 15);
      }
  }
}
</script>

<style>
#app {
  text-align: center;
}
.calculator {
    width: 330px;
    height: 500px;
    color: white;
    background-color: black;
    margin: 10px auto 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 0 10px 10px;
    border-radius: 25px;
    cursor: pointer;
}
.calculator > div {
    font-size: 24px;
    padding-top: 20px;
    opacity: 1;
}
#display {
    grid-column: 1 / 5;
    font-size: 36px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
.zero {
    grid-column: 1 / 3;
    background-color: dimgray;
    border-radius: 40px;
}
.multiple {
    background-color:#c0c0c0;
    border-radius: 50%;
}
.number {
    background-color: dimgray;
    border-radius: 50%;
}
.sign {
    background-color: orange;
    border-radius: 50%;
}
.light {
    position: relative;
    overflow: hidden;
}
.light::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    color: orange;
    opacity: 0;
    transition: background 1s, color 1s, opacity 1s;
}
.light:active::after {
    background: white;
    color: orange;
    opacity: 1;
    transition: 0s;
}
</style>
