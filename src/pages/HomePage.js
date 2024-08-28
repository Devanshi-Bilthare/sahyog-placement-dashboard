import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import  Vacancy from "./VacancyForm"
import  Candidate from "./CandidateForm"
import Employer from "./EmployerRegistrationForm"
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import CandidateList from './CandidateList';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import CompanyList from './CompanyList';
import VacancyList from './VacancyList';
import EditCandidate from './EditCandidate';
import EditEmployee from './EditEmployee';
import EditCompany from './EditCompany';
import EditVacancy from './EditVacancy';
import CompanyDetail from './CompanyDetail';
import CandidateDetail from './CandidateDetail';
import EmployeeDetail from './EmployeeDetail';
import TotalAllotedVacancies from '../components/TotalAllotedVacancies';
import TotalPendingVacancies from '../components/TotalPendingVacancies';
import CandidatesShortListedByJob from './CandidatesShortListedByJob'
import AllCompletedVacancies from './AllCompletedVacancies';
import MailSentVacanciesByEmployee from '../components/MailSentVacanciesByEmployee';
import DashBoardAdmin from './dashboard/DashBoardAdmin';
// import Forms from "./components/Forms";
const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.DashboardAdmin.path} component={DashBoardAdmin} />
    {/* <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} /> */}
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.Vacancy.path} component={Vacancy} />
    <RouteWithSidebar exact path={Routes.TotalAllotedVacancies.path} component={TotalAllotedVacancies} />
    <RouteWithSidebar exact path={Routes.TotalPendingVacancies.path} component={TotalPendingVacancies} />
    <RouteWithSidebar exact path={Routes.AllCompletedVacancies.path} component={AllCompletedVacancies} />
    <RouteWithSidebar exact path={Routes.MailSentVacanciesByEmployee.path} component={MailSentVacanciesByEmployee} />
    <RouteWithSidebar exact path={Routes.Employer.path} component={Employer} />
    <RouteWithSidebar exact path={Routes.Candidate.path} component={Candidate} />
    <RouteWithSidebar exact path={Routes.CandidateList.path} component={CandidateList} />
    <RouteWithSidebar exact path={Routes.EditCandidate.path} component={EditCandidate} />
    <RouteWithSidebar exact path={Routes.CandidateDetail.path} component={CandidateDetail} />
    <RouteWithSidebar exact path={Routes.CandidateShortListedByJob.path} component={CandidatesShortListedByJob} />
    <RouteWithSidebar exact path={Routes.EmployeeList.path} component={EmployeeList} />
    <RouteWithSidebar exact path={Routes.EditEmployee.path} component={EditEmployee} />
    <RouteWithSidebar exact path={Routes.EmployeeDetail.path} component={EmployeeDetail} />
    <RouteWithSidebar exact path={Routes.VacancyList.path} component={VacancyList} />
    <RouteWithSidebar exact path={Routes.EditVacancy.path} component={EditVacancy} />
    <RouteWithSidebar exact path={Routes.CompanyList.path} component={CompanyList} />
    <RouteWithSidebar exact path={Routes.EditCompany.path} component={EditCompany} />
    <RouteWithSidebar exact path={Routes.CompanyDetail.path} component={CompanyDetail} />
    <RouteWithSidebar exact path={Routes.AddEmployee.path} component={AddEmployee} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    {/* <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} /> */}

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
