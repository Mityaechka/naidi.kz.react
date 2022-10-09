import styled from "styled-components";
import React, {Children, cloneElement, ForwardedRef, ReactNode, useEffect, useState} from "react";
import {FieldErrors} from "react-hook-form";
import {SelectOption} from "../Input";

export enum IconPosition {
    Left,
    Right
}

const FormErrorText = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.4px;
  color: #E02B2B;

  margin: 0;
  padding: 3px 0 0 8px;

`

const FormErrorContainer = styled.div`
  height: 18px;
`
const FormError = ({errors, field}:
                       { errors: FieldErrors, field: string }) => <>
    {errors[field] && <FormErrorText>{errors[field]!.message as string}</FormErrorText>}
</>;


const InputContainer = styled.div`
  width: 100%;
  padding-bottom: 12px;
`

const InputLabel = styled.label<{ disabled: boolean }>`
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  color: ${({disabled}) => !disabled ? "#000000" : "rgba(32, 32, 32, 0.5)"};
`

const InputElement = styled.input<{ withIcon: boolean, iconPosition?: IconPosition }>`
  box-sizing: border-box;
  background: #FFFFFF;
  border: 0.5px solid #7B8794;
  border-radius: 8px;
  height: 48px;
  text-indent: 13px;
  width: 100%;
  margin-top: 7px;
  padding-left: ${({withIcon, iconPosition}) => withIcon && iconPosition == IconPosition.Left ? "30px" : undefined};
`

const SelectElement = styled.select`
  box-sizing: border-box;
  background: #FFFFFF;
  border: 0.5px solid #7B8794;
  border-radius: 8px;
  height: 48px;
  text-indent: 13px;
  width: 100%;
  margin-top: 7px;
`


export const AppInput = React.forwardRef(({
                                              field,
                                              label = undefined,
                                              placeholder = undefined,
                                              errors = undefined,
                                              icon = undefined,
                                              iconPosition = IconPosition.Left,
                                              data = undefined,
                                              disabled = false,
                                              value = undefined,
                                              ...rest
                                          }: {
    field: string,
    label?: string,
    placeholder?: string,
    icon?: ReactNode,
    iconPosition?: IconPosition,
    errors?: FieldErrors,
    value?: string,
    disabled?: boolean,
    data?: string[]
}, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <InputContainer>
            <>
                <InputLabel htmlFor={field} disabled={false}>{label}</InputLabel>
                {icon && icon}
                <InputElement name={field}
                              placeholder={placeholder}
                              {...rest} ref={ref}
                              withIcon={icon != undefined}
                              list={field}
                              disabled={disabled}
                              defaultValue={value}
                              iconPosition={iconPosition}/>
                {errors && <FormErrorContainer><FormError errors={errors} field={field}/></FormErrorContainer>}
            </>
        </InputContainer>
    );
});

export const AppSelect = React.forwardRef(({
                                               field,
                                               label,
                                               options,
                                               errors = undefined,
                                               emptyOption = false,
                                               ...rest
                                           }: {
    field: string,
    label: string,
    options: SelectOption[],
    emptyOption?: boolean,
    errors?: FieldErrors
}, ref: ForwardedRef<HTMLSelectElement>) => {
    return (
        <InputContainer>
            <InputLabel htmlFor={field} disabled={false}>{label}</InputLabel>
            <SelectElement name={field} {...rest} ref={ref}>
                {emptyOption && <option value="" title=""/>}
                {options.map(option => <option key={option.value} value={option.value}>{option.title}</option>)}
            </SelectElement>
            {errors && <FormErrorContainer><FormError errors={errors} field={field}/></FormErrorContainer>}
        </InputContainer>
    );
});


const Checkbox = styled.input`
  width: 24px;
  height: 24px;

  color: #2F80ED;

  vertical-align: middle;
  -webkit-appearance: none;

  outline: 0;
  flex-grow: 0;
  background: #FFFFFF none;
  transition: background 300ms;
  cursor: pointer;

  border: 0.5px solid #323F4B;
  border-radius: 4px;

  ::before {
    content: "";
    color: transparent;
    display: block;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
  }

  :checked {
    background-color: currentcolor;
  }

  :checked::before {
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
  }

  :disabled {
    background-color: #CCD3D8;
    opacity: 0.84;
    cursor: not-allowed;
  }
`

export const CheckboxLabel = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  padding-left: 8px;
`


export const AppCheckbox = React.forwardRef(({
                                                 field,
                                                 children,
                                                 defaultValue = false,
                                                 ...rest
                                             }: {
    field: string,
    children: ReactNode,
    errors?: FieldErrors,
    defaultValue?: boolean
}, ref: ForwardedRef<HTMLInputElement>) => {
    //const [checked, setChecked] = useState(defaultValue);

    return (
        <InputContainer>
            <Checkbox name={field}
                      {...rest}
                      ref={ref}
                      type="checkbox"/>
            {children}
        </InputContainer>
    );
});

