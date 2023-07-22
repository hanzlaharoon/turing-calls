'use client'

import { useAuth } from '@/hooks'
import ttLogo from '../../app/tt-logo.png'
import Image from 'next/image'

export function NavBar() {
  const authState = useAuth()
  const {
    state: { status },
    actions: { logout },
  } = authState

  function handleLogout() {
    logout()
  }

  return (
    <>
      <div className="navbar bg-base-100 border-2 border-trueGray-300">
        <div className="flex-1">
          <Image
            src={ttLogo}
            alt="turing technologies logo"
            width={300}
            height={40}
          />
        </div>
        <div className="flex-none">
          {status === 'loggedIn' && (
            <button
              className="btn btn-primary btn-sm rounded-sm px-6"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </>
  )
}
