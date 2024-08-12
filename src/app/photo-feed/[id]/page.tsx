import React from 'react'

type photoFeedProps ={
  params:{
    id:string;
  }
}

export default function page({params}:photoFeedProps) {
  return (
    <div>page {params.id}</div>
  )
}
