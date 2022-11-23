import Main from "./Main";
import GlobalState from "./context/GlobalState";
import ThemeState from "./context/ThemeContext/ThemeState";

export default function App() {
  return (
    <ThemeState>
      <GlobalState>
        <Main></Main>
      </GlobalState>
    </ThemeState>
  );
}
