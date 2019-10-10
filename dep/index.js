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
      if (b && includes.indexOf(isBox.mapData.key) === -1) {
        return
      }
      let obj = isBox.validate()
      if (!result && obj) result = obj
    })
    return result
  }
}
