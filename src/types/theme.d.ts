import 'styled-components'
import {theme} from '../index'

interface IPalette {
    main: string
    contrastText: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            yellow: string,
            black: string,
            white: string,
            gray: string
        },
        m24: string,
        m16: string,
        m8: string,
    }
}