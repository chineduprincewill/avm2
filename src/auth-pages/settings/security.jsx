import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card";
import ProfileInformation from './profile-information';
import { AppContext } from '../../context/AppContext';
import PasswordUpdate from './password-update';
import { fetchUserProfile } from '../../utils/roles';
import SkeletonComponent from '../../components/skeleton-component';
import OfficeLocationUpdate from './office-location-update';
import { Alert, AlertTitle } from '../../components/ui/alert';
import { InfoIcon, LucideMinus, LucidePlus } from 'lucide-react';
import DocumentsValidationSettings from './documents-validation-settings';

const Security = () => {

    const { token, user } = useContext(AppContext);
    const [profile, setProfile] = useState();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [showprofile, setShowprofile] = useState(false);
    const [passwordupdate, setPasswordupdate] = useState(false);
    const [docConf, setDocConf] = useState(false);

    const usr = user && JSON.parse(user);

    const toggleProfile = () => {
        setShowprofile(!showprofile)
    }

    const togglePasswordupdate = () => {
        setPasswordupdate(!passwordupdate)
    }

    const toggleDocConf = () => {
        setDocConf(!docConf)
    }

    useEffect(() => {
        fetchUserProfile(token, setProfile, setError, setLoading)
    }, [])

    return (
        <div className='w-full mt-4 grid gap-6'>
            <div className='w-full hidden justify-between items-center'>
                <span className='text-xl font-extralight'>Security</span>
            </div>
            <div className='w-full grid md:flex md:justify-between md:items-start gap-4'>
                <div className='w-full md:w-[49%]'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Profile information</span>
                                <div 
                                    className='cursor-pointer'
                                    onClick={() => toggleProfile()}
                                >
                                {
                                    showprofile ? 
                                        <LucideMinus /> :
                                        <LucidePlus />
                                }
                                </div>
                            </CardTitle>
                            <CardDescription>
                            Below is your profile information
                            </CardDescription>
                        </CardHeader>
                        <CardContent
                            className={`${showprofile ? 'block' : 'hidden'}`}
                        >
                        {
                            loading || !profile ?
                                <SkeletonComponent /> : 
                                <ProfileInformation profile={profile} />
                        }
                        </CardContent>
                    </Card>
                </div>
                <div className='grid gap-4 w-full md:w-[49%]'>
                    <Card>
                        <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                                <span>Password update</span>
                                <div 
                                    className='cursor-pointer'
                                    onClick={() => togglePasswordupdate()}
                                >
                                {
                                    passwordupdate ? 
                                        <LucideMinus /> :
                                        <LucidePlus />
                                }
                                </div>
                            </CardTitle>
                            <CardDescription>
                            Secure your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent
                            className={`${passwordupdate ? 'block' : 'hidden'}`}
                        >
                            <PasswordUpdate />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {
                (usr?.category === 'system' && usr?.role === 'admin') &&
                <div className='w-full'>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Document upload validation configuration</span>
                            <div 
                                className='cursor-pointer'
                                onClick={() => toggleDocConf()}
                            >
                            {
                                docConf ? 
                                    <LucideMinus /> :
                                    <LucidePlus />
                            }
                            </div>
                        </CardTitle>
                        <CardDescription>
                        Set document upload validation rules here
                        </CardDescription>
                    </CardHeader>
                    <CardContent
                        className={`${docConf ? 'block' : 'hidden'}`}
                    >
                        <DocumentsValidationSettings />
                    </CardContent>
                </Card>
                </div>
            }
        </div>
    )
}

export default Security