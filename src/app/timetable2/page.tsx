'use client'
import { useScheduler } from '@/hooks/useSchedule'
import React, { useEffect } from 'react'

const TimeTablePage = () => {
  const schedule = useScheduler();
  useEffect(()=>{
    console.log(schedule);
  },[schedule])
  return (
    <div>page</div>
  )
}

export default TimeTablePage