import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,chooseComics,chooseDesc,chooseSuper } from '../../redux/slices/rootSlices';
import { Input } from '../shareComponents';
import { serverCalls } from '../../api';
import { useFetch } from '../../custom-hooks';

interface CharFormProps {
    id?:string;
    data?:{}
}

interface CharState {
    comics_appeared: number;
    desc: string;
    name: string;
    super_power: string;
}
    
export const MarvelForm = (props:CharFormProps) => {

    const dispatch = useDispatch();
    let { charData, handleFetch } = useFetch();
    const store = useStore()
    const { register, handleSubmit } = useForm({})
    const navigate = useNavigate();
    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)
        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDesc(data.desc))
            dispatch(chooseSuper(data.super_power))
            dispatch(chooseComics(data.comics_appeared))
            await serverCalls.create(store.getState())     
        }
        handleFetch()
        navigate('/')
        setTimeout(() => navigate('/dashboard') ,1)

    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <Input {...register('name')} name="name" placeholder='Levi' label="Character Name" />
                </div>
                <div>
                    <Input {...register('desc')} name="desc" placeholder='Describe here...' label="Character Desc" />
                </div>
                <div>
                    <Input {...register('super_power')} name="super_power" placeholder='Fast?' label="Super Power" />
                </div>
                <div>
                    <Input {...register('comics_appeared')} name="comics_appeared" placeholder='1' label="Comics Appeared In" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}