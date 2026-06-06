import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = ({ user }) => {

    const location = useLocation();
    const path = location.pathname.replace('/', '').replace('-', ' ');

    return (
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold text-brand capitalize">{path}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {user && `Welcome back, ${user?.username || user?.email} | ${user?.role.replace(/\b\w/g, char => char.toUpperCase())}`}
                </p>
              </div>
            </div>
        </header>
    )
}

export default Header