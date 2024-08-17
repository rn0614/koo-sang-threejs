import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Link from 'next/link'

export default function HomeContent() {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Link href={'/music'}>music</Link>
      <Link href={'/login'}>login</Link>
      <Link href={'/register'}>register</Link>
      <Link href={'/apitest'}>apitest</Link>
      <Link href={'/music/liked'}>liked</Link>
      <Link href={'/photo-feed'}>photo-feed</Link>
      <Link href={'/music/search'}>search</Link>
      <Link href={'/test'}>test</Link>
      <Link href={'/three'}>three</Link>
      <Link href={'/three2'}>htree2</Link>
      <Link href={'/user/rn0614@naver.com'}>user</Link>
    </div>
  )
}
