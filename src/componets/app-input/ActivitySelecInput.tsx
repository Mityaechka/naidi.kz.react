import {Activity} from "../../models/Data";
import {Badge} from "../Badge";
import {useArrayState} from "../../hooks/useArrayState";
import styled from "styled-components";

const ActivitySelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 12px;
`


export const ActivitySelectInput = ({activities}: { activities: Activity[] }) => {
    const [checkedActivities, addActivities, filterActivities] = useArrayState<Activity>([])

    const isActivityChecked = (activity: Activity) => checkedActivities.some(x => x.id == activity.id);

    const clickBadge = (activity: Activity) => {
        if (checkedActivities.some(x => x.id == activity.id)) {
            filterActivities(x => x.id != activity.id)
        } else {
            addActivities(activity)
        }
    }

    return <ActivitySelectContainer>
        {activities.map(activity => <>
            <Badge title={activity.name.ru}
                   checked={isActivityChecked(activity)}
                   onClick={() => clickBadge(activity)}/>
        </>)}
    </ActivitySelectContainer>
}