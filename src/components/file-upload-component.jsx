import { CheckCircle2Icon, CircleQuestionMarkIcon, SearchIcon } from 'lucide-react';
import React, { useContext, useState } from 'react'
import Dropzone from 'shadcn-dropzone';
import { fileUpload } from '../utils/forms';
import { AppContext } from '../context/AppContext';
import { toast } from 'sonner';

const FileUploadComponent = ({ doc }) => {

    const { token } = useContext(AppContext);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [uploading, setUploading] = useState(false);

    const handleFileDrop = (acceptedFiles) => {
        // This function is called when files are dropped or selected
        console.log("Files received:", acceptedFiles);
        
        // Example: Add your API call logic here
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('document_type', doc?.label);
        // axios.post('/api/upload', formData);

        console.log(formData);

        fileUpload(token, formData, setSuccess, setError, setUploading)
    };

    if(success){
        toast.success(`${doc?.label} uploaded successfully!`, {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        })
        //window.location.reload();
    }

    if(error){
        toast.error(JSON.stringify(error), {
            className: "!bg-red-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-red-700",
        });
    }
    
    return (
    <div className="space-y-4">
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
            <div className='flex justify-between items-center mt-4'>
            {acceptedFiles.length > 0 ? 
                <span className="text-sm text-gray-500 mt-2">
                {acceptedFiles.length} file(s) selected
                </span>
                : <span>...</span>
            }
            {
                uploading ? 
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                : (doc.file_path !== null || success ? 
                    <CheckCircle2Icon className='text-accent' /> 
                    :
                    <CircleQuestionMarkIcon className='text-foreground/20' />)
            }
            </div>
            
            </div>
        )}
        </Dropzone>
    </div>
    );
}

export default FileUploadComponent