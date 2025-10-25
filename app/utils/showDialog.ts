import {  render  } from "vue";
import type{ VNode  } from "vue";
import BaseModal from "~/components/BaseModal.vue";

export function showDialog(component: VNode, {prop, ...res} = {prop: {}}){
  const { promise, resolve } = promiseWithResolver();
  
  let container: HTMLDivElement = document.createElement('div')

  let vnode = h(BaseModal, {
    ...res,
    onClose: resolve, 
    onDestroy(){
      render(null, container)
      container = null
      vnode = null
    }
  }, 
  [
    h(component, {
      ...prop,
      onClose:close
    })
  ])

  render(vnode, container)
  document.body.appendChild(vnode.el)

  function close(type: string){
    if(vnode){
      vnode.component.exposed.close(type)
    }{
      resolve(type)
    }
  }

  return {
    promise,
    close,
  }
}