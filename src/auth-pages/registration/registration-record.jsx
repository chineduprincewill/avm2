import React, { useContext, useEffect, useState } from 'react'
import { adminDomainOptions, fetchDomainOptions } from '../../utils/forms';
import SkeletonComponent from '../../components/skeleton-component'
import FileUpload from './file-upload';
import { AppContext } from '../../context/AppContext';
import AlertComponent from '../../components/alert-component';
import DebarrmentBadge from '../../components/debarrment-badge';

const RegistationRecord = ({ regStatus }) => {

    const { token, user } = useContext(AppContext);
    const [list, setList] = useState([]);
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        user && JSON.parse(user)?.category === 'system' ? 
        adminDomainOptions(token, {domain:'registration document', vendor_id:regStatus?.vendor?.id}, setList, setError, setFetching) :
        fetchDomainOptions(token, {domain:'registration document'}, setList, setError, setFetching)
    }, [])

    return (
        <div className='w-full grid gap-4'>
            <div className='w-full grid md:flex md:justify-between md:items-center gap-2'>
                <span className='text-2xl font-extralight capitalize'>Document upload</span>
                <div className='max-w-max flex md:justify-end items-start gap-0 rounded-xl bg-muted border border-border px-4 py-1 shadow-xl font-bold'>
                    <span className='text-lg'>{regStatus?.upload_percentage}</span>
                    <span className='text-xs'>%</span>
                    <span className='text-lg ml-1'>uploaded</span>
                </div>
            </div>
        {
            fetching ? <SkeletonComponent /> :
                regStatus?.registration_percentage > 0 ? (
                    list.length > 0 && 
                    <div className='grid gap-4 md:flex md:flex-wrap md:justify-between'>
                    {
                        list.map(item => (
                            <FileUpload key={item?.id} item={item} />
                        ))
                    }
                    </div>
                ) : <span className='text-foreground/50 text-xl font-extralight px-2 py-1 rounded-md bg-gray-100 dark:bg-background/50'>Registration not started yet, so no document can be uploaded at this time</span>
        }
        </div>
    )
}

export default RegistationRecord