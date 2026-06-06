import React from 'react'
import { Badge } from '../components/ui/badge'

const LeftBanner = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="space-y-3 px-4 py-4 lg:pl-20 pr-5">
                <img src='/assets/logo.png' alt='banner' width="80px" />
                <h1 className="font-extralight leading-tight md:text-xl">
                One Portal. Total Control.<br />{" "}
                    <span className="text-2xl md:text-4xl lg:text-5xl gradient-title font-bold text-blue-950 dark:text-white">Vendor Management, Simplified.</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Stop spreadsheets. Stop chasing. AVM2 centralizes vendor onboarding, compliance, and performance. Reduce risk, automate workflows, and see your entire supply chain in real time.
                </p>
                <Badge 
                    variant="outline" 
                    className="bg-[#5f7f06]/30 border-[#a6ce39]/30 px-4 py-2 text-[#5f7f06] dark:text-[#a6ce39] text-sm font-medium"
                >
                    Vendor compliance. Zero compromise
                </Badge>
            </div>
        </div>
    )
}

export default LeftBanner