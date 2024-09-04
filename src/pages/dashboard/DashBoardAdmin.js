import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { CounterWidget } from "../../components/Widgets";
import { getAllVacancies } from "../../features/vacancy/vacancySlice";
import { getAllEmployees, getSingleEmploye } from "../../features/employee/employeeSlice";

export default () => {
  const dispatch = useDispatch();
 
  const allVacancies = useSelector(state => state.vacancy?.allVacancies);
  const allEmployees = useSelector(state => state.employee?.allEmployees);
  const singleEmployeeData = useSelector(state => state.employee?.singleEmployee);

  const [vacancyCounts, setVacancyCounts] = useState({
    alloted: 0,
    pending: 0,
    completed: 0,
    emailed: 0,
  });

  const [employeesData, setEmployeesData] = useState({});

  useEffect(() => {
    dispatch(getAllVacancies());
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    if (allVacancies) {
      const allotedCount = allVacancies.filter(vacancy => vacancy.allotedTo).length;
      const pendingCount = allVacancies.filter(vacancy => vacancy.status === "Pending").length;
      const completedCount = allVacancies.filter(vacancy => vacancy.status === "completed").length;
      const emailSent = allVacancies.filter(vacancy => vacancy.status === "completed" && vacancy.mail === "sent").length;

      setVacancyCounts({
        alloted: allotedCount,
        pending: pendingCount,
        completed: completedCount,
        emailed: emailSent,
      });
    }
  }, [allVacancies]);

  const fetchEmployeeData = (employeeId) => {
    dispatch(getSingleEmploye(employeeId));
  };

  useEffect(() => {
    if (singleEmployeeData) {
      setEmployeesData(prevData => ({
        ...prevData,
        [singleEmployeeData._id]: singleEmployeeData,
      }));
    }
  }, [singleEmployeeData]);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Alloted Vacancies"
            title={vacancyCounts.alloted}
            icon={faChartLine}
            to='/admin/alloted-vacancies'
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Pending Vacancies"
            title={vacancyCounts.pending}
            icon={faCashRegister}
            to='/admin/pending-vacancies'
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Completed Vacancies"
            title={vacancyCounts.completed}
            icon={faCashRegister}
            to='/admin/completed-vacancies'
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Emailed vacancies"
            title={vacancyCounts.emailed}
            icon={faCashRegister}
            to='/admin/emailSent-vacancies'
          />
        </Col>
      </Row>

      {allEmployees?.map((emp,idx) => {
        if (emp.role !== "admin") {
          if (!employeesData[emp._id]) {
            fetchEmployeeData(emp._id);
          }
          
          const employeeData = employeesData[emp._id] || {};
          const employeePendingVacancies = employeeData.allotedVacancies?.filter(
            vacancy => vacancy.status === "Pending"
          ).length || 0;
          const employeeCompletedVacancies = employeeData.allotedVacancies?.filter(
            vacancy => vacancy.status === "completed"
          ).length || 0;

          const today = new Date().toLocaleDateString('en-GB');
          const interviewCount = employeeData.allotedVacancies?.filter(vac => {
            const interviewDate = new Date(vac.interviewSheduled).toLocaleDateString('en-GB');
            return interviewDate === today;
          }).length;

          return (
            <div className='shadow-lg p-3 mb-3' key={emp?._id}>
              <h1 className="">{emp?.name}</h1>
              <Row className="">
                <Col xs={12} sm={6} xl={3} className="mb-4">
                  <CounterWidget
                    category="Alloted Vacancies"
                    title={employeeData.allotedVacancies?.length || 0}
                    icon={faChartLine}
                    to={`/alloted-vacancies/${idx}`}
                  />
                </Col>
                <Col xs={12} sm={6} xl={3} className="mb-4">
                  <CounterWidget
                    category="Pending Vacancies"
                    title={employeePendingVacancies}
                    icon={faCashRegister}
                    to={`/pending-vacancies/${idx}`}
                  />
                </Col>
                <Col xs={12} sm={6} xl={3} className="mb-4">
                  <CounterWidget
                    category="Completed Vacancies"
                    title={employeeCompletedVacancies}
                    icon={faCashRegister}
                    to={`/completed-vacancies/${idx}`}
                  />
                </Col>
                <Col xs={12} sm={6} xl={3} className="mb-4">
                  <CounterWidget
                    category="Todays Interview"
                    title={interviewCount}
                    icon={faCashRegister}
                    to={`/todays-interviews/${idx}`}
                  />
                </Col>
              </Row>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};
