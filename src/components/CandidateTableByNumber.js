// import React, { useEffect } from 'react'
// // import {CandidateForm } from "../components/Cform";
// import { useDispatch, useSelector } from 'react-redux';
// import { getSingleEmploye } from '../features/employee/employeeSlice';
// import { useParams } from 'react-router-dom';
// import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';


// export default () => {
  
//     const [searchTerm, setSearchTerm] = useState(''); // State for search input
//     const [statusFilter, setStatusFilter] = useState(''); // State for status filter

//     const candidateListState = useSelector(state => state?.candidate?.shortListedCandidateByJob);
//     // const vacancyListState = useSelector(state => state?.employee?.singleEmployee?.allotedVacancies);
//     const totalCandidates = candidateListState?.length;

//   // Filter candidates based on search input and status filter
//   const filteredCandidates = candidateListState?.filter(candidate =>
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (statusFilter === '' || candidate.status === statusFilter)
//   );

//   return (
//     <>
//       {/* Search Input and Status Filter */}
//       <div className="mb-3 d-flex justify-content-between align-items-center">
//         <Form.Control
//           type="text"
//           placeholder="Search by candidate name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: '45%' }}
//         />
//         <Form.Control
//           as="select"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           style={{ width: '45%' }}
//         >
//           <option value="">Filter by status</option>
//           {/* Add the possible status options based on your data */}
//           <option value="Pending">Pending</option>
//           <option value="shortlisted">ShortListed</option>
//           <option value="Selected">Selected</option>
//           <option value="Rejected">Rejected</option>
//           {/* Add more status options as needed */}
//         </Form.Control>
//       </div>

//       <Card border="light" className="table-wrapper table-responsive shadow-sm">
//         <Card.Body className="pt-0">
//           <Table hover className="user-table align-items-center">
//             <thead>
//               <tr>
//                 <th className="border-bottom">S.NO</th>
//                 <th className="border-bottom">Candidate Name</th>
//                 <th className="border-bottom">Mobile</th>
//                 <th className="border-bottom">Status</th>
//                 {/* <th className="border-bottom">  <FontAwesomeIcon icon={faTrashAlt} /> </th> */}
//                 {/* <th className="border-bottom"><FontAwesomeIcon icon={faEdit} /></th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCandidates?.map((candidate, idx) => (
//                 <tr key={candidate._id}>
//                   <td className="border-bottom">{idx + 1}</td>
//                   <td className="border-bottom">
//                     <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link>
//                   </td>
//                   <td className="border-bottom">{candidate.mobile}</td>
//                   <td className="border-bottom">{candidate.status}</td>
//                   {/* <td className="border-bottom cursor-pointer" onClick={() => deleteHandler(candidate._id)}>  <FontAwesomeIcon icon={faTrashAlt} /> </td> */}
//                   <td className="border-bottom">
//                     <Link to={`/edit-candidate/${candidate._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
       
//         </Card.Body>
//       </Card>

//       {/* Select Vacancy and Apply Button */}
//     </>
//   );
// }