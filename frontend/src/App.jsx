import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import PublishBlog from "./pages/PublishBlog";
import UserProfile from "./pages/UserProfile";
import Blog from "./pages/Blog";
import HomeLayout from "./components/HomeLayout";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publishblog" element={<PublishBlog />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/blog/:blogID" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default App;
