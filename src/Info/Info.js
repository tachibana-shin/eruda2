import Tool from '../DevTools/Tool'
import defInfo from './defInfo'
import { each, isFn, isUndef, cloneDeep } from '../lib/util'
import evalCss from '../lib/evalCss'
import { $ } from '../lib/util'

export default class Info extends Tool {
  constructor() {
    super()

    this._style = evalCss(require('./Info.scss'))

    this.name = 'info'
    this._tpl = require('./Info.hbs')
    this._infos = []
  }
  init($el) {
    super.init($el)

    this._addDefInfo()
  }
  destroy() {
    super.destroy()

    evalCss.remove(this._style)
  }
  add(name, val) {
    const infos = this._infos
    let isUpdate = false

    each(infos, (info) => {
      if (name !== info.name) return

      info.val = val
      isUpdate = true
    })

    if (!isUpdate) infos.push({ name, val })

    this._render()

    return this
  }
  get(name) {
    const infos = this._infos

    if (isUndef(name)) {
      return cloneDeep(infos)
    }

    let result

    each(infos, (info) => {
      if (name === info.name) result = info.val
    })

    return result
  }
  remove(name) {
    const infos = this._infos

    for (let i = infos.length - 1; i >= 0; i--) {
      if (infos[i].name === name) infos.splice(i, 1)
    }

    this._render()

    return this
  }
  clear() {
    this._infos = []

    this._render()

    return this
  }
  _addDefInfo() {
    each(defInfo, (info) => this.add(info.name, info.val))
  }
  _render() {
    const infos = []

    each(this._infos, ({ name, val }) => {
      if (isFn(val)) val = val()

      infos.push({ name, val })
    })

    this._renderHtml(this._tpl({ infos }))
  }
  setViewport(width) {
    const meta = $('meta[name="viewport"]')[0]
    if (meta) {
      const content = meta.getAttribute('content')
      meta.setAttribute('content', `width=${width}px, ${content.replace(/width ?= ?[^,]+,?/, '')}`)
    } else {
      $(document.head).append(`
        <meta name="viewport" content="width = ${width}px; initial-scale=1, maximum-scale=1, user-scalable=no">
      `)
    }
  }
  events = []
  _renderHtml(html) {
    this.events.forEach(item => {
      $(item.el).off('click', item.fn)
    })

    if (html === this._lastHtml) return
    this._lastHtml = html
    this._$el.html(html)
    const el = this._$el.find('.eruda-change-device')
    const $this = this

    const fn = function() {
      const width = $(this).attr('data-width')
      $this.setViewport(width)
    }

    this.events.push({ el, fn })
    el.on('click', fn)
  }
}