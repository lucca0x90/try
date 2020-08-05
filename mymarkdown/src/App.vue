<template>
  <div id="app">
          <el-row>
              <el-col :span="12" class="border">
                <el-header><h1>Markdown</h1></el-header>
                <el-main>
                    <el-input 
                    type="textarea" 
                    :rows="15" 
                    placeholder="Type..." 
                    v-model="input"
                    >
                    </el-input>
                </el-main>
              </el-col>
              <el-col :span="12">
                  <el-header><h1>Previewer</h1></el-header>
                    <el-main class="previewer">
                        <vue-markdown
                        :source="input"
                        ></vue-markdown>
                    </el-main>
              </el-col>
          </el-row>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'App',
  data() {
      return {
          input: '',
      }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
#app {
    text-align: center;
    font-family: 'Orbitron', sans-serif;
}
.el-row {
    padding: 20px 150px 0;
}
.border {
    border-right: 2px solid;
}
.el-textarea__inner {
    resize: none !important;
}
.previewer {
    text-align: left;
}
</style>
