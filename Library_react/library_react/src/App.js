import { useDispatch } from "react-redux";
import  RouteComponent  from "./Routes/RouteComponent";
import { useEffect } from "react";
import { getProfile } from "./Features/profileSlice";
import { getCategories } from "./Features/categoriesSlice";

function App() {  

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getCategories())
  }, [])

  return (
    <>
      <RouteComponent />  
    </>
  );
}

export default App;
