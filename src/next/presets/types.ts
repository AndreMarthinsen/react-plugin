import { ReactElement } from 'react'
import { BaseSchemes } from 'rete'

import { ReactRenderPlugin } from '..'
import { ExtraRender } from '../types'

export type RenderPreset<Schemes extends BaseSchemes, T extends ExtraRender> = {
  render: (context: Extract<T, { type: 'render' }>, plugin: ReactRenderPlugin<Schemes, T>) => ReactElement | null | undefined
}
