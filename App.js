import Main from "./Main";
import GlobalState from "./context/GlobalState";

export default function App() {

  return (
    <GlobalState>
    <Main></Main>
    </GlobalState>
  );
}
