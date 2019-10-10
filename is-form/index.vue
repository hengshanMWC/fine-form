<template>
  <div class="is-form">
    <slot></slot>
  </div>
</template>

<script>
import Dep from '../dep'
export default {
  name: 'is-form',
  componentName: 'is-form',
  data () {
    return {
      dep: null,
      timer: null
    }
  },
  props: {
    formData: Object, // 动态渲染的监控
    // 滚动容器
    scrollDom: {
      type: HTMLElement,
      default () {
        return document.documentElement
      }
    },
    // 是否滚动
    isScroll: {
      type: Boolean,
      default: true
    },
    // 滚动距离px
    step: {
      type: Number,
      default: 100
    }
  },
  watch: {
    formData: {
      handler () {
        this.dep = new Dep()
      },
      immediate: true
    }
  },
  mounted () {
    this.bindHandleStop = this.handleStop.bind(this)
    document.addEventListener('touchstart', this.bindHandleStop)
  },
  beforeDestroy () {
    document.removeEventListener('touchstart', this.bindHandleStop)
    this.handleStop()
  },
  methods: {
    /**
     * 表单验证
     * @param {Array} 只验证的字段
     * @returns
     */
    validate (includes) {
      let result = this.dep.notify(includes)
      if (this.isScroll && result && result.isSlot.elm) {
        this.scrollTarget(result.isSlot.elm)
      }
      // result && result.isSlot.elm.getBoundingClientRect())
      return result
    },
    handleStop () {
      clearInterval(this.timer)
    },
    scrollTarget (elm) {
      let { height, y } = elm.getBoundingClientRect()
      let scrollDistance = y - height
      this.timerScroll(this.scrollDom, scrollDistance, elm)
    },
    timerScroll (scrollDom, scrollDistance, elm) {
      let targetDistance = scrollDom.scrollTop + scrollDistance
      this.timer = setInterval(() => {
        let distance = scrollDom.scrollTop - targetDistance
        if (distance < this.step || distance === 0) {
          scrollDom.scrollTop = targetDistance
          clearInterval(this.timer)
          elm.querySelector('input').focus()
        } else {
          scrollDom.scrollTop -= this.step
        }
      }, 30)
    }
  }
}
</script>
