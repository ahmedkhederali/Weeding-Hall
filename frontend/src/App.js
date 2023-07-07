import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardBody from "./Components/DashboardBody";
import Notfound from "./pages/NotFound/Notfound";
import Hall from "./pages/Hall";
//user Functions
import Login from "./pages/UserFunctions/Login/Login";
import Register from "./pages/UserFunctions/Register/Register";
import ResetPasswordForm from "./pages/UserFunctions/ResetPassword/ResetPassword";
import ForgetPassword from "./pages/UserFunctions/ForgetPassword/ForgetPass.jsx";
import Profile from "./pages/UserFunctions/Profile/Profile";
import Faviourit from "./pages/Faviourit";
import Trend from "./pages/Trend";
import Explore from "./pages/Explore";
import CustomIcons from "./pages/BookPage";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import Reports from "./pages/Reports";
import BookedPage from "./pages/BookedPage";
import AdminHome from "./pages/AdminPage/AdminHome";
import CreateHall from "./pages/AdminPage/CreateHall";
import AdminAllHall from "./pages/AdminPage/AdminAllHall";
import AdminReports from "./pages/AdminPage/AdminReports";
import AdminEditSliderImages from "./pages/AdminPage/AdminEditSliderImages";
import CaptionCarousel from "./pages/LibararyCarasoul/LibararyCarasoul";
import LibararyContentPage from "./pages/LibararyContentPage/LibararyContentPage";
import AboutLibarary from "./pages/StaticData/AboutLibarary"
const theme = extendTheme({
  components: {
    Steps,
  },
});
function App() {
  const admin = localStorage.getItem("admin") === "admin" ? true : false;
  const user = localStorage.getItem("admin") === "user" ? true : false;

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/*User Page Login */}
          <Route exact path="/login" element={user ? <Hall /> : <Login />} />
          {/*User Page Register */}
          <Route
            exact
            path="/register"
            element={user ? <Hall /> : <Register />}
          />
           <Route
            exact
            path="/about"
            element={user ? <AboutLibarary /> : <Register />}
          />
          {/*User Page Reset Password */}

          <Route
            exact
            path={`/api/v1/user/reset/:id`}
            element={user ? <Hall /> : <ResetPasswordForm />}
          />
          {/*User Page Forget Password */}
          <Route
            exact
            path="/forgetpass"
            element={user ? <Hall /> : <ForgetPassword />}
          />

          {/*Home Page */}
          <Route
            exact
            path="/"
            element={admin ? <AdminHome /> : user ? <LibararyContentPage/> : <Login />}
          />
          {/*Page of Specific Hall*/}
          <Route
            exact
            path="/hall/:id"
            element={user ? <DashboardBody /> : <Login />}
          />

          {/*Profile Page*/}

          <Route
            exact
            path="/profile"
            element={(user || admin) ? <Profile /> : <Login />}
          />
          {/*Reports Page*/}

          <Route
            exact
            path="/reports"
            element={user ? <Reports /> : <Login />}
          />
          {/*Faviourte Page*/}

          <Route
            exact
            path="/faviourt"
            element={user ? <Faviourit /> : <Login />}
          />
          {/*Trend Page*/}

          <Route exact path="/trend" element={user ? <Trend /> : <Login />} />
          {/*Explore Page*/}

          <Route
            exact
            path="/explore"
            element={user ? <Explore /> : <Login />}
          />

          {/*Book Page*/}

          <Route
            exact
            path="/book/:id"
            element={user ? <CustomIcons /> : <Login />}
          />
          {/* */}
          <Route exact path="/bookpage" element={<BookedPage />} />

          {/*Not Found Page*/}
          {/*Admins Routes */}
          <Route
            exact
            path="/createhall"
            element={admin ? <CreateHall /> : <Login />}
          />

          <Route
            exact
            path="/adminallhall"
            element={admin ? <AdminAllHall /> : <Login />}
          />

          <Route
            exact
            path="/adminallreport"
            element={admin ? <AdminReports /> : <Login />}
          />

          <Route
            exact
            path="/admin/images/:id"
            element={admin ? <AdminEditSliderImages /> : <Login />}
          />
          <Route path="*" exact element={<Notfound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
