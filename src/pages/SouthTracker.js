import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Table } from '@themesberg/react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleVacancies } from '../features/vacancy/vacancySlice';
import { CSVLink } from 'react-csv';

export default () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [statusFilter, setStatusFilter] = useState(''); // State for status filter

    const candidateListState = useSelector(state => state?.candidate?.shortListedCandidateByJob);
    const vacancy = useSelector(state => state.vacancy?.singleVacancy)
    
    const totalCandidates = candidateListState?.length;

  const filteredCandidates = candidateListState?.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || candidate.status === statusFilter)
  );

  useEffect(()=>{
    dispatch(getSingleVacancies(id))
  },[])

  const csvData = filteredCandidates?.map((candidate, idx) => ({
    SNO: idx + 1,
    Role: vacancy?.role || '',
    RoleLocation: vacancy?.jobLocation || '',
    CandidateName: candidate.name || '',
    MobileNo: candidate.mobile || '',
    EmailID: candidate.email || '',
    DOB: candidate.dob || '',
    Gender: candidate.gender || '',
    CandidateLocation: candidate.city || '',
    State: candidate.state || '',
    TwoWheeler: candidate.twoWheelerAvailable ? 'Yes' : 'No', // Assuming this is a boolean
    '10%': candidate.tenthPercentage || '',
    '10thPassingYear': candidate.tenthPassingYear || '',
    '12%': candidate.twelfthPercentage || '',
    '12thPassingYear': candidate.twelfthPassingYear || '',
    GraduationPercentage: candidate.gradPercentage || '',
    GraduationPassingYear: candidate.gradPassingYear || '',
    PostGraduationPercentage: candidate.postGradPercentage || '',
    PostGraduationPassingYear: candidate.postGradPassingYear || '',
    TotalExperience: candidate.totalExperience || '',
    CurrentCtc: candidate.currentCTC || '', // If employed
    JobProfileExplained: candidate.jobProfileExplained ? 'Yes' : 'No', // Assuming this is a boolean
    CTCInformed: candidate.ctcInformed ? 'Yes' : 'No', // Assuming this is a boolean
    ConsultantName: candidate.consultantName || '',
    Remark: candidate.remark || ''
}));
  

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by candidate name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '45%' }}
        />
         <CSVLink
                    data={csvData}
                    filename={`candidates_${id}.csv`}
                    className="btn btn-primary"
                    target="_blank"
                >
                    Export CSV
                </CSVLink>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">S.NO</th>
                <th className="border-bottom">Role</th>
                <th className="border-bottom">Role Location</th>
                <th className="border-bottom">Candidate Name</th>
                <th className="border-bottom">Mobile No</th>
                <th className="border-bottom">Email ID</th>
                <th className="border-bottom">DOB</th>
                <th className="border-bottom">Gender</th>
                <th className="border-bottom">Candidate Location</th>
                <th className="border-bottom">State</th>
                <th className="border-bottom">Two Wheeler(Y/N)</th>
                <th className="border-bottom">10%</th>
                <th className="border-bottom">10th Passing Year</th>
                <th className="border-bottom">12%</th>
                <th className="border-bottom">12th Passing Year</th>
                <th className="border-bottom">Graduation%</th>
                <th className="border-bottom">Graduation Passing Year</th>
                <th className="border-bottom">Post Graduation</th>
                <th className="border-bottom">Post Graduation Pasasing Year</th>
                <th className="border-bottom">Total Experience</th>
                <th className="border-bottom">Current Ctc If employed</th>
                <th className="border-bottom">Job Profile explained to candidate (Y/N)</th>
                <th className="border-bottom">CTC Informed to candidate (Y/N)</th>
                <th className="border-bottom">Consultant Name</th>
                <th className="border-bottom">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td className="border-bottom">{idx + 1}</td>
                  <td className="border-bottom">{vacancy?.role}</td>
                  <td className="border-bottom">{vacancy?.jobLocation}</td>
                  <td className="border-bottom">
                  {candidate.name}
                    {/* <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link> */}
                  </td>
                  <td className="border-bottom">{candidate.mobile}</td>
                  <td className="border-bottom">{candidate.email}</td>
                  <td className="border-bottom">{candidate.dob}</td>
                  <td className="border-bottom">{candidate.gender}</td>
                  <td className="border-bottom">{candidate.city}</td>
                  <td className="border-bottom">{candidate.state}</td>
                  <td className="border-bottom">{candidate.twoWheelerAvailable}</td>
                  <td className="border-bottom">{candidate.tenthPercentage}</td>
                  <td className="border-bottom">{candidate.tenthPassingYear}</td>
                  <td className="border-bottom">{candidate.twelfthPercentage}</td>
                  <td className="border-bottom">{candidate.twelfthPassingYear}</td>
                  <td className="border-bottom">{candidate.gradPercentage}</td>
                  <td className="border-bottom">{candidate.gradPassingYear}</td>
                  <td className="border-bottom">{candidate.postGradPercentage}</td>
                  <td className="border-bottom">{candidate.postGradPassingYear}</td>
                  <td className="border-bottom">
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
       
        </Card.Body>
      </Card>

      {/* Select Vacancy and Apply Button */}
    </>
  );
};
  