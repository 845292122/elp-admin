export const RouteUtil = {
  filterAuthRoutes: (routes, isAdmin) => {
    let adminBool = false
    if (isAdmin === 1) {
      adminBool = true
    }
    return routes.filter(route => {
      if (Array.isArray(route.children)) {
        route.children = RouteUtil.filterAuthRoutes(route.children, isAdmin)
      }
      if (!route.requireAdmin) return true
      return adminBool === route.requireAdmin
    })
  },
  filterHiddenRoutes: routes => {
    return routes.filter(route => {
      if (route.hidden && route.hidden === true) {
        return false
      }
      if (route.children) {
        route.children = RouteUtil.filterHiddenRoutes(route.children)
      }
      return true
    })
  },
  transformRoutesToPermTree: routes => {
    return routes
      .filter(route => route.meta?.perm)
      .map(route => {
        const transformed = {
          label: route.meta.title ?? '无权限名称',
          key: route.meta.perm,
          perm: route.meta.perm
        }

        if (route.children?.length) {
          const validChildren = RouteUtil.transformRoutesToPermTree(route.children)
          if (validChildren.length) {
            transformed.children = validChildren
          }
        }

        return transformed
      })
  }
}
