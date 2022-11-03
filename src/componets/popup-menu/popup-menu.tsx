import {MoreVertical} from "react-feather";
import {Menu, MenuItem} from "@szhsin/react-menu";

export type PopupMenuItem = {
    title: string,
    onClick: () => void
} | undefined

export const PopupMenu = ({items}: { items: PopupMenuItem[] }) => {
    return <Menu menuButton={<MoreVertical/>} transition direction="left">
        {items.filter(x => x != undefined).map(item => <MenuItem onClick={item!.onClick}>{item!.title}</MenuItem>)}
    </Menu>
}