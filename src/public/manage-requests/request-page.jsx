import React, { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input'
import { CloudUpload, MoveLeft, Search } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';
import { directorates } from '../../lib/data';
import FileUploadComponent from '../../components/file-upload-component';
import { Button } from '../../components/ui/button';
import SkeletonComponent from '../../components/skeleton-component';
import { searchTrackingid, submitProcurementRequest } from '../../utils/forms';
import ButtonLoader from '../../components/button-loader';
import Dropzone from 'shadcn-dropzone';
import useExcelConverter from '../../hooks/useExcelConverter';
import { toast } from 'sonner';
import { formatDateAndTime, removeDuplicateSentences } from '../../utils/functions';

const RequestPage = () => {

    const [selectedDirectorate, setSelectedDirectorate] = useState();
    const [selectedUnit, setSelectedUnit] = useState();
    const [units, setUnits] = useState();
    const [email, setEmail] = useState();
    const [title, setTitle] = useState();
    const [trackingdata, setTrackingdata] = useState();
    const [trackingid, setTrackingid] = useState();
    const [tracking, setTracking] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [searching, setSearching] = useState(false);
    const [file, setFile] = useState();
    const [submitting, setSubmitting] = useState(false);

    const { data, loading, convertToJson, clearData } = useExcelConverter();

    const getDirectorateUnits = () => {
        let filteredUnits;

        if(selectedDirectorate){
            directorates.filter(dir => {
                if(dir.title === selectedDirectorate){
                    filteredUnits = dir.units;
                }
            }) 
        }
        return filteredUnits;
    }

    const handleFileDrop = async (acceptedFiles) => {
        // This function is called when files are dropped or selected
        //console.log("Files received:", acceptedFiles[0]);
        //setFile(acceptedFiles[0]);
        const file = acceptedFiles[0];

        if (file) {
            try {
              await convertToJson(file, {
                header: 0,        // Use first row as header
                defval: '',       // Empty cells become empty string
                blankrows: false  // Skip blank rows
              });
            } catch (err) {
              console.error('Conversion failed:', err);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();        
        // Example: Add your API call logic here
        /**const formData = new FormData();
        formData.append('directorate', selectedDirectorate);
        formData.append('unit', selectedUnit);
        formData.append('email', email);
        formData.append('title', title);
        formData.append('file', file);
        // axios.post('/api/upload', formData);*/
        const rdata = {
            selectedDirectorate,
            selectedUnit,
            email,
            title,
            file : data
        }
        
        submitProcurementRequest(rdata, setSuccess, setError, setSubmitting)
    }

    if(success){
        toast.success("Procurement request submitted successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        console.log(success);
        setSuccess();
        setTrackingid(success?.trackingid);
    }

    if(error){
        //alert(JSON.stringify(error.replaceAll(/[\\"{}[\],]/g, '')));
        toast.error(removeDuplicateSentences(JSON.stringify(error.replaceAll(/[\\"{}[\],]/g, ''))), {
            className: "!bg-red-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-red-700",
        });
        setError();
    }

    useEffect(() => {
        setUnits(getDirectorateUnits());
    }, [selectedDirectorate])

    useEffect(() => {
        (trackingid && trackingid.length > 10) && 
        searchTrackingid({ trackingid }, setTrackingdata, setError, setSearching);
    }, [trackingid])

    return (
        <div className='flex justify-center bg-background p-4'>
            <div className='w-full z-30 grid gap-4 md:w-2/3 my-4'>
                <div className='grid gap-0'>
                    <a href='/'>
                        <MoveLeft size={50} className='text-brand' />
                    </a>
                    <span className='text-4xl md:text-7xl font-extralight text-brand mt-[-10px]'>
                        Submit and track your requests
                    </span>
                </div>
                <div className='w-full grid gap-2 md:gap-4 md:my-2'>
                    <span className='text-lg md:text-2xl font-extralight'>
                        Provide tracking ID to check the status of your request
                    </span>
                    <div className='w-full flex items-center gap-2 md:gap-4'>
                        <Input 
                            type="text"
                            className="w-full px-4 md:px-6 py-4 rounded-full md:text-xl h-8 md:h-12 border border-muted-foreground"
                            placeholder="Enter tracking ID"
                            onChange={(e) => setTrackingid(e.target.value)}
                        />
                        <Search size={50} className='hidden cursor-pointer text-brand hover:text-brand/50' />
                    </div>
                </div>
                <div className='w-full flex items-center gap-1'>
                    <div className='w-full border-t border-muted-foreground'></div>
                    <span className='text-3xl md:text-5xl mx-auto font-extralight max-w-max text-brand'>OR</span>
                    <div className='w-full border-t border-muted-foreground'></div>
                </div>
            {
                searching ? <ButtonLoader loadingText={`Searching records for ${trackingid}...`} /> :
                (trackingdata ? (
                    trackingdata?.id ? 
                        <div className='w-full grid gap-4 p-4 rounded-xl border border-accent bg-accent/20 text-xl md:text-2xl font-extralight my-2'>
                            <div className='grid gap-0'>
                                <span className='text-sm'>Request status</span>
                                <span>{trackingdata?.request_title} request with Tracking ID <span className='font-normal'>{trackingdata?.trackingid}</span> from {trackingdata?.unit} unit of {trackingdata?.directorate} directorate is <span className='font-normal'>{trackingdata?.request_status}</span></span>
                            </div>
                            <div className='grid gap-0'>
                                <span className='text-sm'>Request was made by</span>
                                <span>{trackingdata?.email} on {formatDateAndTime(trackingdata?.created_at)}</span>
                            </div>
                            <span>Do you want to submit a new request? <span className='text-accent cursor-pointer hover:text-accent/50 hover:underline' onClick={() => setTrackingdata()}>Click here</span></span>
                        </div>
                        :
                        <div className='w-full grid gap-2 md:gap-6 p-4 rounded-xl border border-brand bg-brand/20 text-xl md:text-4xl font-extralight my-2'>
                            <span>No record found for Tracking ID {trackingid}!</span>
                            <span>Do you want to submit a new request? <span className='text-accent cursor-pointer hover:text-accent/50 hover:underline' onClick={() => setTrackingdata()}>Click here</span></span>
                        </div>
                ) :
                <div className='w-full grid gap-3 md:gap-6'>
                    <p className='w-full text-xl md:text-3xl font-extralight leading-normal'>
                    Submit a new request
                    </p>
                    <form onSubmit={handleSubmit} className='w-full grid md:flex md:items-start gap-0 dark:gap-4 border border-border shadow-xl dark:border-none dark:shadow-none rounded-xl'>
                        <div className='w-full md:w-3/5 grid gap-4 bg-card/30 p-6 rounded-xl dark:shadow-xl'>
                            <Select
                                value={selectedDirectorate} // Reflects the current state
                                onValueChange={setSelectedDirectorate} // Updates the state on selection
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a directorate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Directorate</SelectLabel>
                                    {
                                        directorates.map( dir => (
                                            <SelectItem key={dir.id} value={dir.title}>{dir.title}</SelectItem>
                                        ))
                                    }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedUnit} // Reflects the current state
                                onValueChange={setSelectedUnit} // Updates the state on selection
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Unit</SelectLabel>
                                    {
                                        units && units.length > 0 && units.map( un => (
                                            <SelectItem key={un.id} value={un.title}>{un.title}</SelectItem>
                                        ))
                                    }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Input 
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                type="text"
                                placeholder="Request title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='w-full md:w-2/5 grid gap-4 bg-card/30 p-6 rounded-xl dark:shadow-xl'>
                            {/**<FileUploadComponent doc={doc} /> */}
                            <Dropzone onDrop={handleFileDrop}>
                            {({ getRootProps, getInputProps, isDragAccept, acceptedFiles }) => (
                                <div
                                {...getRootProps()}
                                className={`p-6 rounded-lg text-center cursor-pointer transition-colors ${
                                    isDragAccept ? 'border-green-500 bg-green-50' : 'border-gray-300'
                                }`}
                                >
                                <input {...getInputProps()} />
                                {isDragAccept ? (
                                    <p className="text-green-600">Drop your files here...</p>
                                ) : (
                                    <p>Drag & drop a file here, or click to select one</p>
                                )}
                                <div className='flex justify-center items-center mt-4'>
                                    {acceptedFiles.length > 0 ? 
                                        <span className="text-sm text-gray-500 mt-2">
                                        {acceptedFiles[0]?.name} file selected
                                        </span>
                                        : <span>...</span>
                                    }
                                </div>
                                
                                </div>
                            )}
                            </Dropzone>
                            <Button
                                type="submit"
                                disabled={submitting}
                                variant='outline'
                                className="bg-accent hover:bg-accent/80 px-4 py-6"
                            >
                            {
                                submitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Uploading...
                                    </span>
                                ) : 
                                <span className="flex items-center gap-2">
                                    <CloudUpload />
                                    Upload
                                </span>
                            }
                            </Button>
                        </div>
                    </form>
                </div>)
            }
            </div>
            <div className='w-full hidden md:block fixed top-0 h-screen m-0 bg-[url("/assets/req-bg1.png")] bg-contain opacity-10 dark:opacity-10'></div>
        </div>
    )
}

export default RequestPage