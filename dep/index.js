export default class Dep {
  constructor () {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    this.subs = this.subs.filter(val => val !== sub)
  }
  notify (includes = []) {
    let result = null
    let b = !!includes.length
    this.subs.forEach(isBox => {
      if (b && !includes.includes(isBox.mapData.key)) {
        isBox.setBorder(false)
        return
      }
      let obj = isBox.validate()
      if (!obj) {
        isBox.setBorder(false)
      }
      if (!result && obj) result = obj
    })
    return result
  }
}
