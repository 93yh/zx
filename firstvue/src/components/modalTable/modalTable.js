import Vue from "vue";
const constructor = Vue.extend(require('../modalTable.vue').default)
 
let nId = 1
let instances = []
 
const ModalTable = (options) => {
  let id = 'table-' + nId++;
  options = options || {};
 
  console.log("options", options);
 
  // 重点：绑定关闭事件
  options.onClose = function (vmId) {
    ModalTable.close(vmId)
  }
 
  // 实列化
  const instance = new constructor({
    //重点：在这里将你传过来的参数匹配到modalTable.vue组件的data
    data: {
      ...options,
      vmId: id
    }
  })
 
  console.log("instance", instance);
 
  instance.id = id;
  instance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
  document.body.appendChild(instance.$el) // 将dom插入body
  instance.visible = true //这里修改modalTable.vue数据中的visible,这样modalTable组件就显示出来
  instances.push(instance)
  return instance
};
 
ModalTable.close = function (vmId) {
  console.log("vmId", vmId)
  instances.forEach((instance, index) => {
    if (instance.id == vmId) {
      document.body.removeChild(instances[index].$el)
      instances.splice(index, 1)
    }
  })
}
ModalTable.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}
export default ModalTable;