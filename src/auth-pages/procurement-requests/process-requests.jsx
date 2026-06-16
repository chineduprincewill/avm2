import React from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'

const ProcessReqests = ({ req }) => {
    return (
        <DialogContent className="w-[95vw] max-h-[95vh] overflow-y-auto !max-w-none">
            <DialogHeader>
                <DialogTitle className="text-2xl font-extralight">Procurement request Tracking ID : {req?.trackingid}</DialogTitle>
                <DialogDescription>
                Process procurement request
                </DialogDescription>
            </DialogHeader>
            <div className='w-full'>
                {console.log(JSON.parse(req?.request_data))}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default ProcessReqests