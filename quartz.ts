import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./quartz/plugins"

// Disables the default filter so NyaLib.md stays visible inside NyaLib/
ExternalPlugin.plugins["explorer"].Explorer({
  filterFn: undefined,
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
