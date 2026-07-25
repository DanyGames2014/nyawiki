import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./quartz/plugins"

ExternalPlugin.Explorer({
  // 1. Show same-named files (like NyaLib.md inside NyaLib/) inside the tree
  filterFn: undefined, // Clears default filter so index/matching files aren't hidden

  // 2. Prevent 404s by making folders without markdown pages unclickable
  mapFn: (node) => {
    if (node.isFolder && !node.data) {
      node.slug = undefined // Prevents Quartz from rendering an <a> tag link
    }
    return node
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
