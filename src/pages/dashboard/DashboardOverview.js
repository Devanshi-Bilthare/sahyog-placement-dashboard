import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faPlus, faRocket, faTasks, faUserShield, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getSingleEmploye } from "../../features/employee/employeeSlice";
import { CounterWidget, SalesValueWidgetPhone } from "../../components/Widgets";
import { AllotedVacansiesByEmployee } from "../../components/Tables";

export default () => {
  const dispatch = useDispatch();
  const [pendingVac, setPendingVac] = useState(0);

  const currentEmployee = useSelector(state => state.employee?.employee);
  const employee = useSelector(state => state.employee?.singleEmployee);

  useEffect(() => {
    if (currentEmployee?._id) {
      dispatch(getSingleEmploye(currentEmployee._id));
    }
  }, [dispatch, currentEmployee]);

  useEffect(() => {
    if (employee?.allotedVacancies) {
      // Count the number of vacancies with a status of "Pending"
      const pendingCount = employee.allotedVacancies.filter(vac => vac.status === "Pending").length;
      setPendingVac(pendingCount);
    }
  }, [employee]);

  return (
    <>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Alloted Vacancies"
            title={employee?.allotedVacancies?.length || 0}
            icon={faChartLine}
            to='/alloted-vacancies'
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Pending Vacancies"
            title={pendingVac}
            icon={faCashRegister}
            to='/pending-vacancies'
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Completed Vacancies"
            title={employee?.allotedVacancies?.length-pendingVac}
            icon={faCashRegister}
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Emailed vacancies"
            title={pendingVac}
            icon={faCashRegister}
            to='/mail-sent'
          />
        </Col>
      </Row>
      <AllotedVacansiesByEmployee pending={true}  vacancyListState={employee?.allotedVacancies}/>
    </>
  );
};
