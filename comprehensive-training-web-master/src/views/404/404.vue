<template>
  <div class="not_found">
    <p class="p1">
      页面将在<span class="span1">{{ time }}</span
      >秒后自动跳转首页，<br />
      您也可以点击这里跳转<a class="a1" href="/">登录</a>
    </p>
  </div>
</template>

<script setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { useRouter } from 'vue-router'
import { reactive, toRefs } from '@vue/reactivity'
let router = useRouter()
const data = reactive({
  time: '10',
  time_end: null,
  computed: {}, // 计算属性，会监听依赖属性值随之变化
  watch: {} // 监控data中的数据变化
})
const GoIndex = () => {
  let _t = 9
  data.time_end = setInterval(() => {
    if (_t !== 0) {
      data.time = _t--
    } else {
      router.replace('/')
      clearTimeout(data.time_end)
      data.time_end = null
    }
  }, 1000)
}
// const destroyed = () => {
//   clearTimeout(data.time_end)
//   data.time_end = null
// } // 生命周期 - 销毁完成
// 初始化，生命周期 - 创建完成（可以访问当前this实例）
GoIndex()
const { time } = toRefs(data)
</script>

<style>
.not_found {
  width: 100%;
  height: 100%;
  background: url('../../assets/404.gif') no-repeat;
  background-position: center;
  background-size: cover;
}
.p1 {
  position: absolute;
  top: 45%;
  left: 65%;
  transform: translate(-50%, 0);
  color: #fff;
}
.span1 {
  color: orange;
  font-family: '仿宋';
  font-size: 25px;
}
.a1 {
  font-size: 30px;
  color: aqua;
  text-decoration: underline;
}
</style>
