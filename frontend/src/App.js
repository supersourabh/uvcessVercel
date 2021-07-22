import './App.css';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './HomeComponents/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SubjectScreen from './Screens/SubjectScreen';
import CrScreen from './Screens/CrScreen';
import TimetablScreen from './Screens/TimetablScreen';
import SyllabusDisplayScreen from './Screens/SyllabusDisplayScreen';
import CrsListScreen from './Screens/CrsListScreen';
import MembersListScreen from './Screens/MembersListScreen';
import ProblemsScreen from './Screens/ProblemsScreen';
import ViewScreen from './Screens/ViewScreen';
import ProblemsListScreen from './Screens/ProblemsListScreen';
import MemberAddScreen from './Screens/MemberAddScreen';
import PrivateRoute from "./HomeComponents/PrivateRoute"
import AdminRoute from "./HomeComponents/AdminRoute"
import CrRoute from "./HomeComponents/CrRoute"
import ExamRelatesScreen from './Screens/ExamRelatesScreen';
import ExamRelatesUploadScreen from './Screens/ExamRelatesUploadScreen';
import AdminListScreen from './Screens/AdminListScreen';
import DownloadScreen from './Screens/DownloadScreen';


function App() {
  return (
    <div className='grid-container'>

      <BrowserRouter>
          <header style={{zIndex:100000}} className="header">
            <Header/>
          </header>
          <main className="main">
          <Switch>

            <Route path="/" exact component={HomeScreen}></Route>

            <Route path="/signup"  exact component={RegisterScreen}></Route>

            <PrivateRoute path="/material"  exact component={SubjectScreen}></PrivateRoute>
            
            <PrivateRoute path="/syllabus" exact  component={SyllabusDisplayScreen}></PrivateRoute>

            <PrivateRoute path="/ExamRelative" exact  component={ExamRelatesScreen}></PrivateRoute>

            <CrRoute path="/cr/material"  exact component={CrScreen}/>

            <CrRoute path="/cr/timetable"  exact component={TimetablScreen}></CrRoute>

            <CrRoute path="/cr/qps"  exact component={ExamRelatesUploadScreen}></CrRoute>

            <PrivateRoute path="/connect/crs" exact  component={CrsListScreen}></PrivateRoute>

            <PrivateRoute path="/connect/members" exact  component={MembersListScreen}></PrivateRoute>

            <PrivateRoute path="/connect/problems" exact  component={ProblemsScreen}></PrivateRoute>

            <PrivateRoute path="/material/view/:id" exact  component={ViewScreen}></PrivateRoute>

            <PrivateRoute path="/material/download/:id/:screen" exact  component={DownloadScreen}></PrivateRoute>

            <AdminRoute path="/admin/memberAdd" exact  component={MemberAddScreen}></AdminRoute>

            <AdminRoute path="/admin/problems" exact  component={ProblemsListScreen}></AdminRoute>

            <AdminRoute path="/admin/list" exact  component={AdminListScreen}></AdminRoute>
          </Switch>
          
          </main>
          
      </BrowserRouter>
    </div>
    
    
  );
}

export default App;
