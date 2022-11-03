import {useNavigate} from "react-router-dom";
import {useStores} from "../../../store/root-store";
import {useEffect, useState} from "react";
import {User, UserRole} from "../../../models/user-data";
import api from "../../../api";
import DataTable, {TableColumn} from 'react-data-table-component';
import {MoreVertical} from "react-feather";
import {Menu, MenuItem} from "@szhsin/react-menu";
import {localize} from "../../../helpers/localization";
import {AppButton} from "../../../componets/app-input/app-button";
import styled from "styled-components";
import {useApiCall} from "../../../hooks/usePromises";
import {appLoading} from "../../../store/app-state-store";
import {log} from "util";

export const UsersView = ({}: {}) => {
    const navigation = useNavigate()
    const {cache, app, modal} = useStores()


    app.setSection("moderation-users")

    const [users, usersFetch] = useApiCall([],api.admin.getUsers(), appLoading(app))

    console.log(users)
    const columns: TableColumn<User>[] = [
        {
            name: 'ФИО',
            selector: row => row.fio,
        },
        {
            name: 'Почта',
            selector: row => row.email,
        },
        {
            name: 'Роль',
            selector: row => localize(UserRole.toLocalized(row.role))
        },
        {
            name: '',
            selector: row => row.fio,
            cell: row => <Menu menuButton={<MoreVertical/>} transition direction="left">
                <MenuItem onClick={() => navigation(`/admin/users/${row.id}/edit`)}>Редактировать</MenuItem>
            </Menu>
        }
    ]


    return <>
        <div>
            <AppButton color="yellow" fullWidth={false} click={() => navigation('/admin/users/create')}>Создать нового пользователя</AppButton>
        </div>
        <DataTable
            columns={columns}
            data={users}
        />
    </>
}

