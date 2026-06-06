import React, { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const ProfileInformation = ({ profile }) => {

    console.log(profile)

    const [username, setUsername] = useState(profile && profile?.username ? profile?.username : '');
    const [email, setEmail] = useState(profile && profile?.email ? profile?.email : '');
    const [role, setRole] = useState(profile && profile?.role ? profile?.role : '');
    const [category, setCategory] = useState(profile && profile?.category ? profile?.category : '');
    const [vendor_name, setVendor_name] = useState(profile && profile?.vendor_name ? profile?.vendor_name : '');

    return (
        <form className='w-full grid gap-4'>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Username</Label>
                <Input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid gap-3 w-full">
                <Label htmlFor="title-1">Email</Label>
                <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Role</Label>
                <Input 
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid gap-3 w-full">
                <Label htmlFor="title-1">Group</Label>
                <Input 
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Vendor</Label>
                <Input 
                    value={vendor_name}
                    onChange={(e) => setVendor_name(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
        </form>
    )
}

export default ProfileInformation