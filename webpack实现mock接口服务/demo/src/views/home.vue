<template>
  <div class="page page-home">
    <h1>HOME</h1>
    <button @click="demo1">点击获取接口</button>
    <div>{{info}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

export default {
  data () {
    return {
      info: ''
    }
  },
  created () {

  },
  mounted () {
  },
  activated () {

  },
  methods: {
    demo1() {
      axios.get('http://127.0.0.1:9001/api/demo1').then(res => {
        this.info = res.data
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" rel="stylesheet/less">
.page-home {
  h1 {
    color: #333;
  }
}
</style>
