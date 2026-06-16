import React, { useContext, useState } from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Star } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { submitVendorRating } from '../../utils/forms';
import { toast } from 'sonner';

const VendorRatingModal = ({ vendor }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [rating, setRating] = useState(vendor?.vendor_rating);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState(false);
    
    const limit = 5;

    const submitRating = () => {
        if(window.confirm(`Are you sure you are rating ${vendor?.vendor_name} as a ${rating}-Star vendor?`)){
            const data = {
                id : vendor?.id,
                rating
            }

            submitVendorRating(token, data, setSuccess, setError, setSubmitting)
        }
    }

    if(success){
        toast.success(`${vendor?.vendor_name} rated as a ${rating}-Star vendor successfully!`, {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        })
        refreshRecord(Date.now());
        setSuccess()
    }

    if(error){
        toast.error(JSON.stringify(error), {
            className: "!bg-red-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-red-700",
        });
    }


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl font-extralight">Rate {vendor?.vendor_name}</DialogTitle>
                <DialogDescription>
                Select Star to rate this vendor
                </DialogDescription>
            </DialogHeader>
            <div className='w-full grid gap-8'>
                <div className='w-full flex items-center justify-center gap-4'>
                {[...Array(limit)].map((_, i) => (
                    <Star 
                        size={40}
                        key={i} 
                        className={`${i < rating ? 'text-orange-400' : 'text-muted-foreground/20' }`} 
                        onClick={() => setRating(i+1)}
                    />
                ))}
                </div>
                <Button 
                    variant="outline"
                    className="bg-accent hover:bg-accent/80 dark:text-black"
                    onClick={() => submitRating()}
                >
                    {submitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                    </span>
                    ) : (
                    "Submit rating"
                    )}
                </Button>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default VendorRatingModal