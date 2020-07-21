import Vue from 'vue'

const requireComponents = require.context('@/components/base', true, /\.vue$/)

// requireComponents.keys().forEach(fileName => {
//   const componentConfig = requireComponents(fileName).default
//   Vue.component(componentConfig.name, componentConfig)
// })

requireComponents.keys().forEach(fileName => {
  const componentName = `Base${fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')}`
  Vue.component(componentName, resolve => {
    const componentConfig = requireComponents(fileName)
    resolve(componentConfig.default || componentConfig)
  })
})
