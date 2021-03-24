<template>
  <div class="page page-home">
    <button @click="demo1">点击获取接口</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { netTool, NetTask } from '@net/netTool'

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
      let ps = []
      for (let i = 0; i < 100; i++) {
        let data = {
          param: `hello ${i}`
        }
        let netTask = new NetTask('/veryslow', data)
        ps.push(netTool.addTask(netTask))
      }
      // map操作使得promise失败不影响其他promise返回
      Promise.all(ps.map(p => p.catch(e => e))).then(results => {
        console.log(results)
      }).catch(e => {
        console.log('取消了~')
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
