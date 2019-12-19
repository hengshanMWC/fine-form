<template>
  <div class="is-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'is-box',
  data () {
    return {
    }
  },
  props: {
    /**
     * key
     * is
     * isText
     * no
     */
    mapData: Object
    // value: {
    //   validator: value => true
    // }
  },
  computed: {
    isForm () {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'is-form') {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    value () {
      return this.isForm.formData[this.mapData.key]
    }
  },
  watch: {
    value () {
      if (this.mapData.no) this.setBorder(false)
    },
    'isForm.dep': {
      handler (dep, olDep) {
        if (!dep) return
        dep.addSub(this)
        if (olDep) olDep.removeSub(this)
      },
      immediate: true
    }
  },
  model: {
    prop: 'map.no',
    event: 'no'
  },
  methods: {
    /**
     * 判断
     * @return {Object|undefined} 不通过返回警告语，通过不返回东西
     */
    isArray () {
      let is = this.mapData.is
      let value = this.value
      let obj = is.find(obj => !obj.fn(value, this.isForm.formData))
      if (obj) {
        return { warning: obj.warning }
      }
    },
    setBorder (b) {
      this.$emit('no', {
        no: b,
        key: this.mapData.key,
        mapData: this.mapData
      })
    },
    /**
     * @return {Object|Boolean} 失败返回Object，成功返回true
     */
    validate () {
      let { is, isText, none } = this.mapData
      if (none) return
      let obj = null
      let b = false
      if (isText === false && isN(this.value)) {
        return
      } else if (isText) {
        b = this.isValue()
        if (b) obj = {warning: isText}
      }
      if (!b && Array.isArray(is)) obj = this.isArray()
      if (obj) {
        obj.isSlot = this.$slots.default[0]
        this.setBorder(true)
        return obj
      }
    },
    isValue () {
      let value = this.value
      if (Array.isArray(value)) {
        return value.length === 0
      } else {
        return value === '' || value === undefined
      }
    }
  }
}
</script>
