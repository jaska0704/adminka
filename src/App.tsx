import { Route, Routes } from "react-router-dom"
import  Login  from "./pages/login/login"
import { mainPages } from "./routes/routes"
import { MainLayout } from "./layout/main-layout"


function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<MainLayout/>}>
          {mainPages.map(({component: Element, id, path}) => (
              <Route index={path ? false : true} key={id} path={path} element={<Element/>}/>
          ))}
      </Route>
    </Routes>
     
    </>
  )
}

export default App
