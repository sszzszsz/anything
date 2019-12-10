export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    console.log('🚶 page move to', to.path)
    store.dispatch('global/writePageName', to.name)
    store.dispatch('global/writeGNaviOpen', false)
    store.dispatch('global/writePageTransition', true)
    if (to.params.id !== undefined) {
      store.dispatch('global/writePageParam', to.params.id)
    }
  })
}
