import styled from "styled-components";
import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Check, X} from "react-feather";
import prepend from "react-hook-form/dist/utils/prepend";
import {useStores} from "../../store/root-store";
import {Activity, AppRange} from "../../models/data";
import {MobileBarExtension} from "../mobile-bar";
import {localize} from "../../helpers/localization";
import {FilterArea, FilterRef} from "./filter-area";
import {App} from "../../index";

const Clear = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #2F80ED;
`

const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #202020;
`
const Container = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  margin: 20px 10px;
`

const FiltersContainer = styled.div`
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export type ResumeFilterResult = {
    age?: { id: string, range: AppRange<number> },
    activities?: string[],
    pay?: { id: string, range: AppRange<number> }
}

export const ResumeFilters = ({
                                  onClose,
                                  onChange,
                                  init
                              }: { onClose: () => void, init?: ResumeFilterResult, onChange: (result: ResumeFilterResult) => void }) => {
    const {cache} = useStores()
    const [activities, setActivities] = useState<Activity[]>([])

    const [result, setResult] = useState<ResumeFilterResult>({})

    useEffect(() => {
        onChange(result)
        console.log(result)
    }, [result])

    const ageFilter = useRef<FilterRef>(null)
    const activityFilter = useRef<FilterRef>(null)
    const payFilter = useRef<FilterRef>(null)

    useEffect(() => {
        Promise.all([cache.getAllActivities()]).then(result => {
            const [activitiesResult] = result
            setActivities(activitiesResult!)
        })
    })

    const pay = [
        {name: "до 100 000тг", id: '1', range: AppRange.create(undefined, 100_000)},
        {name: "от 100 000тг до 200 000 тг", id: '2', range: AppRange.create(100_000, 200_000)},
        {name: "от 200 000тг до 300 000 тг", id: '3', range: AppRange.create(200_000, 300_000)},
        {name: "от 300 000тг до 500 000 тг", id: '4', range: AppRange.create(300_000, 500_000)},
        {name: "от 500 000тг", id: '5', range: AppRange.create(500_000)},
    ]

    const age = [
        {name: "18-25", id: '1', range: AppRange.create(18, 25)},
        {name: "25-35", id: '2', range: AppRange.create(25, 35)},
        {name: "35+", id: '3', range: AppRange.create(35)},
    ]

    const changeAge = (checked: string[]) => {
        if (checked.length == 0) {
            setResult(prevState => ({...prevState, age: undefined}));
        } else {
            setResult(prevState => ({...prevState, age: age.find(x => x.id == checked[0])}));
        }
    }
    const changePay = (checked: string[]) => {
        if (checked.length == 0) {
            setResult(prevState => ({...prevState, pay: undefined}));
        } else {
            setResult(prevState => ({...prevState, pay: pay.find(x => x.id == checked[0])}));
        }
    }

    const changeActivities = (checked: string[]) => {
        setResult(prevState => ({...prevState, activities: checked}));
    }


    const clear = () => {
        ageFilter.current!.clear()
        activityFilter.current!.clear()
        payFilter.current!.clear()
    }

    return <div>
        <MobileBarExtension>
            <Container>
                <Clear onClick={clear}>Очистить</Clear>
                <Title>Фильтры</Title>
                <X onClick={onClose}/>
            </Container>
        </MobileBarExtension>

        <FiltersContainer>
            <FilterArea ref={activityFilter} init={init?.activities} onChange={changeActivities} title="РАБОТА"
                        items={activities.map(x => {
                            return {name: localize(x.name), id: x.id}
                        })}/>
            <FilterArea ref={payFilter} init={pay.filter(x => x.id == init?.pay?.id).map(x => x.id)}  onChange={changePay} title="ОПЛАТА" items={pay} single/>
            <FilterArea ref={ageFilter} init={age.filter(x => x.id == init?.age?.id).map(x => x.id)} onChange={changeAge} title="ВОЗРАСТ" items={age} single/>
        </FiltersContainer>
    </div>
}
