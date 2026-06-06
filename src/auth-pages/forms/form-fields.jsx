import React, { useContext, useEffect, useState } from 'react';
import DataTable from '@/components/data-table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle2Icon, Edit, KeyRound } from 'lucide-react';
import { fetchFormfields, updateFormUid } from '../../utils/forms';
import { AppContext } from '../../context/AppContext';
import SkeletonComponent from '../../components/skeleton-component';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import { toast } from 'sonner';

const FormFields = ({ formid, isCreated, setIsEdit, isEdit, setIsUpdating, uniqueid }) => {

    const { token, record, refreshRecord } = useContext(AppContext);
    const [formfields, setFormfields] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [uid, setUid] = useState();
    const [updating, setUpdating] = useState(false);
    const [uniqueUpdated, setUniqueUpdated] = useState();
    
    const columns = [
        {
            accessorKey: 'label',
            header: 'Field',
            cell: ({row}) => {
                const field = row.original;
                return(
                    <div className='flex items-center gap-2'>
                        <span className="font-extralight">{field.label}</span>
                    {
                        field.fieldName === uniqueid && <KeyRound size={14} className='text-accent' />
                    }
                    </div>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'form_category',
            header: 'Category',
            cell: ({row}) => {
                const field = row.original;
                return(
                    <span className="font-extralight">{field.form_category}</span>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
            const form = row.original; 
            const [isOpen, setIsOpen] = useState(false);
            const [assignOpen, setAssignOpen] = useState(false);

            return (
                <div className="w-full flex items-center gap-3">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Edit 
                            className="h-4 w-4 cursor-pointer" 
                            onClick={() => updateFormFields(form)}
                        />
                    </DialogTrigger>
                    <div></div>
                </Dialog>
                </div>
            );
            },
        },
    ];

    const datafilters = [
        {
            title: "label",
            placeholder: "filter by label..."
        },
        {
            title: "form_category",
            placeholder: "filter by category..."
        }
    ]

    const data = {
        formid
    }

    const updateFormFields = (fld) => {
        isEdit && setIsEdit(null);
        setIsUpdating(true)
        setIsEdit(fld);

    }

    const handleUpdateFormUid = () => {

        if(!uid){
            toast.error("Unique Identifier must be selected!", {
                className: "!bg-red-700 !text-white !border-white !font-bold",
                descriptionClassName: "!text-red-700",
            });
        }
        else{
            const data = {
                formid, uid
            }

            updateFormUid(token, data, setSuccess, setError, setUpdating)
        }
    }

    if(success){
            toast.success("Form unique identifier updated successfully!", {
                className: "!bg-green-700 !text-white !border-white !font-bold",
                descriptionClassName: "!text-green-700",
            });
            refreshRecord(Date.now());
            setSuccess();
            setUid('');
    }

    useEffect(() => {
        fetchFormfields(token, data, setFormfields, setError, setLoading);
    }, [isCreated, record])
    
    return (
        <div className='w-full grid gap-4 max-h-120'>
            <div className='w-full grid gap-4 md:flex md:items-center px-4'>
                <span className='text-sm text-nowrap'>Set form records Unique Identifier</span>
                <div className='w-full flex items-center gap-0'>
                    <Select
                        required
                        onValueChange={setUid}
                    >
                        <SelectTrigger className="min-w-24">
                            <SelectValue placeholder="Select Unique ID" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Unique ID</SelectLabel>
                            {
                                formfields && formfields.length > 0 && formfields.map(fm => (
                                    <SelectItem key={fm?.id} value={fm?.fieldName}>{fm?.label}</SelectItem>
                                ))
                            }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button 
                        className="rounded-l-none rounded-r-md"
                        onClick={() => handleUpdateFormUid()}
                    >
                    {
                        updating ?
                        <Spinner /> :<CheckCircle2Icon />
                    }   
                    </Button>
                </div>
            </div>
            <div className='w-full max-h-96 overflow-y-scroll px-4'>
            {
                loading ? <SkeletonComponent /> :
                formfields &&
                <DataTable data={formfields} columns={columns} filterArrs={datafilters} />
            }
            </div>
        </div>
    )
}

export default FormFields