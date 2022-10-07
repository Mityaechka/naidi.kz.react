import {CSSProperties, ReactNode} from "react";

const H2 = ({children, style = undefined}: { children: ReactNode, style?: CSSProperties | undefined }) => {
    return <h2 className="typography__h2" style={style}>{children}</h2>
}
const Text = ({children, bold = false, style = undefined}:
                  {
                      children: ReactNode,
                      bold?: boolean,
                      style?: CSSProperties | undefined
                  }) => {
    return <p className={`typography__text ${bold ? 'typography__text-bold' : ''}`}
              style={style}>{children}</p>
}

const CardTitle = ({children, style = undefined}: { children: ReactNode, style?: CSSProperties | undefined }) => {
    return <h2 className="typography__title" style={style}>{children}</h2>
}

const Hint = ({children, style = undefined}: { children: ReactNode, style?: CSSProperties | undefined }) => {
    return <h2 className="typography__hint" style={style}>{children}</h2>
}

const Typography = {H2, Text, CardTitle, Hint};

export {Typography};