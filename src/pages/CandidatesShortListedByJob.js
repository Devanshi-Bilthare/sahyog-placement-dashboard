import React, { useEffect } from 'react'
import { CandidateTable, CandidateTableByJob } from '../components/Tables'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { shortListedCandidateByJob } from '../features/candidate/candidateSlice'
import { Button, Form } from '@themesberg/react-bootstrap'


const CandidateList = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(shortListedCandidateByJob(id))
    })
  return (
    <>  
       <Button variant="light" className='mb-5'><Link to={`/south-tracker/${id}`}>South Tracker</Link></Button>
        <CandidateTableByJob/>
    </>
  )
}

export default CandidateList