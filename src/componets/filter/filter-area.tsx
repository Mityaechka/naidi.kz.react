import styled from "styled-components";
import {Check} from "react-feather";
import {forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import {BaseText} from "../styles";

const FilterAreaContainer = styled.div`

`

const FilterAreaTitle = styled(BaseText)`
  font-weight: 700;
`

const FilterAreaContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  max-height: 200px;
  overflow-y: auto;
`

const FilterAreaItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 24px;
`

const FilterAreaItemCheckbox = styled.div`
  width: 24px;
  height: 24px;
  background: #2F80ED;
  border-radius: 4px;
`

const CheckIcon = styled(Check)`
  width: 24px;
  height: 24px;
  background: #2F80ED;
  border-radius: 4px;
`

type FilterProps = {
    title: string,
    items: { name: string, id: string }[],
    single?: boolean,
    onChange: (checked: string[]) => void,
    init?: string[]
}

export interface FilterRef {
    clear: () => void
}

export const FilterArea = forwardRef(({
                                          title,
                                          items,
                                          onChange,
                                          init,
                                          single = false
                                      }: FilterProps, ref: Ref<FilterRef>) => {
    const [checkedItems, setCheckedItems] = useState<string[]>(init ?? [])

    useEffect(() => {
        onChange(checkedItems)
    }, [checkedItems])

    const maxItems = 3

    const [showAll, setShowAll] = useState(false)
    const clear = () => setCheckedItems([]);

    useImperativeHandle(
        ref,
        () => ({
            clear
        }),
    )

    const showMoreButton = items.length > maxItems
    const visibleItems = showAll ? items : items.slice(0, maxItems)


    const addCheckedItem = (id: string) => {
        setCheckedItems(prev => [...prev, id])
    }

    const removeCheckedItem = (id: string) => {
        setCheckedItems(prev => prev.filter(x => x != id))
    }

    const isChecked = (id: string) => checkedItems.some(x => x == id)

    const checkClick = (id: string) => {
        if (single) {
            if (isChecked(id)) {
                setCheckedItems([])
            } else {
                setCheckedItems([id])
            }
            return
        }

        if (isChecked(id)) {
            removeCheckedItem(id)
            return
        }

        addCheckedItem(id)
    }


    return <>
        <FilterAreaContainer>
            <FilterAreaTitle>{title}</FilterAreaTitle>
            <FilterAreaContainerWrapper>
                {visibleItems.map(item => <FilterAreaItemContainer
                    onClick={() => checkClick(item.id)}>
                    <span>{item.name}</span>

                    {isChecked(item.id) &&
                        <FilterAreaItemCheckbox><CheckIcon color="white"/></FilterAreaItemCheckbox>
                    }

                </FilterAreaItemContainer>)}
            </FilterAreaContainerWrapper>
            {showMoreButton && !showAll &&
                <span onClick={() => setShowAll(true)}>+ Посмотреть больше</span>}

            {showMoreButton && showAll &&
                <span onClick={() => setShowAll(false)}>- Показать меньше</span>}
        </FilterAreaContainer>
    </>
})