import { CircleAlert } from 'lucide-react'
import React from 'react'

const DebarrmentBadge = ({msg, size}) => {
    return (
        <div className='w-full flex items-center gap-4 border border-amber-700 dark:border-white rounded-lg p-4 bg-brand/50 text-amber-800 dark:text-white'>
            <CircleAlert size={28} />
            <span className={`text-${size} font-semibold`}>{msg}</span>
        </div>
    )
}

export default DebarrmentBadge