import {ReactNode} from "react";
import {BlockProps} from "./Block";
import styled, {css} from "styled-components";

export type ButtonProps = {
    children: ReactNode,
    click?: () => void,
    color?: ButtonColor,
    fullWidth?: boolean,
    disabled?: boolean,
    type?: "button" | "submit" | "reset" | undefined
}

type ButtonColor = "yellow" | "black";

const ButtonFillStyle = styled.button<{ color: ButtonColor, fullWidth: boolean }>`
  width: ${({fullWidth}) => fullWidth ? '100%' : undefined};

  border-radius: 8px;


  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  text-align: center;

  color: ${({color, theme}) =>
          color == "black" ? theme.colors.white : theme.colors.black};

  background: ${({color, theme}) =>
          color == "black" ? theme.colors.black : theme.colors.yellow};

  border-color: ${({color, theme}) =>
          color == "black" ? theme.colors.black : theme.colors.yellow};


  margin: 0 auto;
  padding: 12px 16px;

  :disabled {
    background: ${({theme}) => "#999"};
  }
`

export const Button = ({
                           children,
                           click = undefined,
                           color = undefined,
                           fullWidth = true,
                           disabled = false,
                           type = "button"
                       }: ButtonProps) => {
    return <ButtonFillStyle type={type} color={color ?? "black"} fullWidth={fullWidth} disabled={disabled}
                            onClick={() => {
                                if (click) {
                                    click();
                                }
                            }
                            }>{children}
    </ButtonFillStyle>
}

export const ButtonStroke = ({children, click = undefined}: ButtonProps) => {
    return <button type="button" className="button-stroke"
                   onClick={() => {
                       if (click) {
                           click();
                       }
                   }}>{children}</button>
}