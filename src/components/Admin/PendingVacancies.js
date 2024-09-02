import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable } from '../Tables';


export default () => {
    
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const pendingVacancies = allVacancies?.filter(vacancy => vacancy.status === "Pending");
  return (
   <>
    <AdminTable vacancyListState={pendingVacancies}/>
   </>
  )
}