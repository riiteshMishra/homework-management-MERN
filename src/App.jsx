import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Homeworks from './pages/Homeworks'
import Navbar from './components/navbar/Navbar'
import Login from './pages/Login'
import Universal from './pages/Universal'
import Dashboard from './pages/Dashboard'
import User from './components/dashboard/User/User'
import Myhomework from './components/dashboard/Student/Myhomewors'
import Myresult from './components/dashboard/Student/Myresult'
import CreateHomework from './components/dashboard/Teacher/CreateHomework'
import AllHomeworks from './components/dashboard/Teacher/AllHomeworks'
import CheckHomework from './components/dashboard/Teacher/CheckHomework'
import StudentsList from './components/dashboard/Teacher/StudentsList'
import ViewHomework from './components/dashboard/User/ViewHomework'

const App = () => {
  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)
  return (
    <div className='min-h-screen bg-[#d9f0f8]'>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/homework' element={<Homeworks />} />
        {
          !token && <Route path='/login' element={<Login />} />
        }

        {/* Protected */}
        {
          token && (
            <Route path='/dashboard' element={<Dashboard />}>

              {/* Open routes */}
              <Route path='profile' element={<User />} />
              <Route path='homeworks/:homeworkId' element={<ViewHomework />} />

              {/* Teachers only */}
              {
                user?.accountType === "teacher" && (
                  <>
                    <Route path='homework/create' element={<CreateHomework />} />
                    <Route path='homework/update/:homeworkId' element={<CreateHomework />} />

                    <Route path='homeworks/all' element={<AllHomeworks />} />

                    <Route path='result/create' element={<CheckHomework />} />

                    <Route path='students' element={<StudentsList />} />

                  </>
                )
              }
              {/* Students only */}

              {
                user?.accountType === "student" && (
                  <>


                    <Route path='my-homeworks' element={<Myhomework />} />

                    <Route path='my-results/:homeworkId' element={<Myresult />} />
                  </>
                )
              }
            </Route>
          )
        }

        <Route path='*' element={<Universal />} />

      </Routes>

    </div>
  )
}

export default App