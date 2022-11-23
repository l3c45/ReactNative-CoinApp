import { useEffect, useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import { checkIsLogged } from "./firebase/Session";
import Navigator from "./Navigator/Navigator";

export default function Main() {
  const {  getToken } = useContext(GlobalContext);

  useEffect(() => {
    const unsuscribe = checkIsLogged(getToken);
  }, []);

  return (
   <Navigator></Navigator>
  );
}
