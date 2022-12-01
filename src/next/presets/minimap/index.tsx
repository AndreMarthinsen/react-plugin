
import * as React from 'react'
import { BaseSchemes } from 'rete'

import { RenderPreset } from '../types'
import { Minimap } from './components/Minimap'
import { MinimapRender } from './types'

export function setup<Schemes extends BaseSchemes>(props?: { size?: number }): RenderPreset<Schemes, MinimapRender<Schemes>> {
    return {
        render(context) {
            if (context.data.type === 'minimap') {
                return <Minimap
                    nodes={context.data.nodes}
                    size={props?.size || 200}
                    ratio={context.data.ratio}
                    viewport={context.data.viewport}
                    translate={context.data.translate}
                />
            }
        }
    }
}
