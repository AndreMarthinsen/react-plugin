import * as React from 'react'
import { BaseSchemes, Scope } from 'rete'
import { Area2DInherited, RenderData } from 'rete-area-plugin'

import { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import { ExtraRender } from './types'
import { Root } from './utils'

export * as Presets from './presets'
export type { ReactArea2D, RenderPayload } from './types'

type Props = {
    createRoot?: (container: Element | DocumentFragment) => any
}

export class ReactRenderPlugin<Schemes extends BaseSchemes,T extends ExtraRender = never> extends Scope<never, Area2DInherited<Schemes, T>> {
    renderer: Renderer
    presets: RenderPreset<Schemes, T>[] = []

    constructor(props: Props) {
        super('react-render')
        this.renderer = getRenderer({ createRoot: props.createRoot })

        this.addPipe(context => {
            if (!('type' in context)) return context
            if (context.type === 'unmount') {
                this.unmount(context.data.element)
            } else if (context.type === 'render') {
                if ('filled' in context.data && context.data.filled) {
                    return context
                }
                if (this.mount(context.data.element, context as T)) {
                    return {
                        ...context,
                        data: {
                            ...context.data,
                            filled: true
                        }
                    }
                }
            }

            return context
        })
    }

    private mount(element: HTMLElement, context: T) {
        const parent = this.getParentScope()

        for (const preset of this.presets) {
            const result = preset.render(context, this)

            if (!result) continue

            const reactElement = (
                <Root rendered={() => parent?.emit({ type: 'rendered', data: context.data })}>
                    {result}
                </Root>
            )

            this.renderer.mount(reactElement, element)
            return true
        }
    }

    private unmount(element: HTMLElement) {
        this.renderer.unmount(element)
    }

    public getParentScope() {
        const parent = super.parentScope()

        if (!parent) throw new Error('parent scope not found')

        return parent
    }

    public addPreset(preset: RenderPreset<Schemes, T | { type: 'render', data: RenderData<Schemes> }>) {
        this.presets.push(preset)
    }
}