import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PortfolioSimpleFooter from "./Components/PortfolioSimpleFooter";
import AboutPage from "./Components/AboutPage/AboutSimpleFooter"; 
import AddProjects from './Components/AddProjects/AddProjects';
import AddLogo from './Components/AddProjects/AddLogo';
import ViewLogo from './Components/AddProjects/ViewLogo';

import SignUp from "./Components/AuthPage/SignUp";
import SignIn from "./Components/AuthPage/SignIn";
import UserAccessPoint from "./Components/AuthPage/UserAccessPoint";
import UserAccess from "./Components/AuthPage/UserAccess";


import Recruter from "./Components/AuthPage/Recruter";
import RecurterSignIn from "./Components/AuthPage/RecurterSignIn";
import RecruterPage from "./Components/RecruterHome/RecruterPage";







import BrandAdd from  './Components/AddProjects/Brand Identity/Add'
import BrandView from './Components/AddProjects/Brand Identity/View'



import AIMLAdd from './Components/AddProjects/AIML/Add'
import AIMLView from './Components/AddProjects/AIML/View'



import ProjectsAdd from './Components/AddProjects/Projects/Add'
import ViewProjects from './Components/AddProjects/Projects/View'


import AddCretificate from "./Components/AddProjects/Cretificates/AddCretificate";
import ViewCertificate from "./Components/AddProjects/Cretificates/ViewCertificate";


import UpdateData from './Components/AddProjects/Update/UpdateData'



import ResumeTemplate from "./Components/Resume/ResumeTemplate";
import AdminDataComponent from "./Components/Resume/AdminDataComponent";
import Preview from "./Components/Resume/Preview";







function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/" element={<PortfolioSimpleFooter/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
            <Route path="/addprojects" element={<AddProjects/>}></Route>

           


            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>



            <Route path="/accesspoint" element={<UserAccessPoint/>}></Route>
            <Route path="/access" element={<UserAccess/>}></Route>
            
            <Route path="/addlogo" element={<AddLogo/>}></Route>
            <Route path="/viewlogo" element={<ViewLogo/>}></Route>

            <Route path="/brandadd" element={<BrandAdd/>}></Route>
            <Route path="/brandview" element={<BrandView/>}></Route>



            <Route path="/addaiml" element={<AIMLAdd/>}></Route>
            <Route path="/viewaiml" element={<AIMLView/>}></Route>


            <Route path="/addproject" element={<ProjectsAdd/>}></Route>
            <Route path="/viewproject" element={<ViewProjects/>}></Route>


            <Route path="/addcertificate" element={<AddCretificate/>}></Route>
            <Route path="/viewcertificate" element={<ViewCertificate/>}></Route>
            


            <Route path="/updatedata" element={<UpdateData/>}></Route>




            <Route path="/recreterAuthSignUp" element={<Recruter/>}></Route>
            <Route path="/recreterAuthSignIn" element={<RecurterSignIn/>}></Route>
            <Route path="/recreterPage" element={<RecruterPage/>}></Route>






            <Route path="/resumetemplate" element={<ResumeTemplate/>}></Route>
            <Route path="/adminDataComponent" element={<AdminDataComponent/>}></Route>
            <Route path="/preview" element={<Preview/>}></Route>
            
            
          </Routes>
          <ToastContainer theme="dark" />
      </div>
    </BrowserRouter>
  );
}

export default App;
