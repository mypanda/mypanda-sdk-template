interface IVNode {
  tag: any
  attrs: any
  childrens: any
}

export function createElement(tag: string, attrs: Object, ...childrens: any[]) {
  return {
    tag,
    attrs,
    childrens
  }
}

export function renderNode(vnode: IVNode, container: Element, before: Function) {
  before()
  render(vnode, container)
}

export function render(vnode: IVNode, container: Element, replace: boolean = false) {
  if (vnode === undefined) return


  if (typeof vnode === 'string' || typeof vnode === 'number') {
    let textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }

  const { tag, attrs, childrens } = vnode
  const dom = document.createElement(tag)
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  childrens.forEach((child: IVNode) => render(child, dom))

  return container.appendChild(dom)
}
function setAttribute(dom: any, key: any, value: any) {
  if (key === 'className') {
    key = 'class'
  }

  if (/on\w+/.test(key)) {
    key = key.toLowerCase()
    dom[key] = value || ''
    dom.addEventListener(key, value, false)
    return
  } else if (key === 'style') {
    if (!value || typeof key === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let k in value) {
        if (typeof value[k] === 'number') {
          dom.style[k] = value[k] + 'px'
        } else {
          dom.style[k] = value[k]
        }
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value || ''
    }
    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
  dom.setAttribute(key, value)
}

export function createDom(tag: string| undefined, attrs: any):Element {
  if (!tag) {
    tag = 'div'
  }
  const oElement = document.createElement(tag)
  for( let item in attrs) {
    oElement.setAttribute(item, attrs[item])
  }
  return oElement
}