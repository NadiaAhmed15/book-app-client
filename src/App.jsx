import { BrowserRouter,Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateBooks from "./pages/CreateBooks"
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <BrowserRouter>
    <Routes>

<Route path='/' element={<Login/>}/>
<Route path='/home' element={<Home/>}/>
<Route path='/signup' element={<SignUp/>}/>
<Route path='/books2/create' element={<CreateBooks/>}/>
<Route path="/books2/details/:id" element={<ShowBook />} />
<Route path="/books2/edit/:id" element={<EditBook />} />
<Route path="/books2/delete/:id" element={<DeleteBook />} />






    </Routes>
    </BrowserRouter>
  )
}

export default App

