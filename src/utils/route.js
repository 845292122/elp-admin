export const RouteUtil = {
  filterRoutesByPermAndHidden: (routes = [], perms = []) => {
    return routes
      .filter(route => route.meta.perm == null || perms.includes(route.meta.perm))
      .map(route => ({
        ...route,
        children: route.children ? RouteUtil.filterRoutesByPermAndHidden(route.children, perms) : undefined
      }))
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
