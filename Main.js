import { useEffect, useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import { checkIsLogged } from "./firebase/Session";
import Navigator from "./Navigator/Navigator";
import SplashCreen from "./pages/SplashCreen";

export default function Main() {
  const {  getToken } = useContext(GlobalContext);

  useEffect(() => {
    const unsuscribe = checkIsLogged(getToken);
    return () => unsuscribe()
  }, []);

  return (
   <Navigator></Navigator>
 
  );
}
