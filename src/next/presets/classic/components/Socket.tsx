import * as React from 'react'
import { ClassicPreset } from 'rete'
import styled from 'styled-components'

import { $socketcolor, $socketmargin, $socketsize } from '../vars'

const Styles = styled.div`
    display: inline-block;
    cursor: pointer;
    border: 1px solid white;
    border-radius: ${$socketsize/2.0}px;
    width: ${$socketsize}px;
    height: ${$socketsize}px;
    margin: ${$socketmargin}px;
    vertical-align: middle;
    background: ${$socketcolor};
    z-index: 2;
    box-sizing: border-box;
    &:hover {
      border-width: 4px;
    }
    &.multiple {
      border-color: yellow;
    }
    &.output {
      margin-right: - ${$socketsize / 2}px;
    }
    &.input {
      margin-left: - ${$socketsize / 2}px;
    }
`

export function Socket<T extends ClassicPreset.Socket>(props: { data: T }) {
    return (
        <Styles title={props.data.name} />
    )
}