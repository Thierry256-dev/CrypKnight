import { BrowserRouter as Router } from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <LayOut>
          <AppRoutes />
        </LayOut>
      </Router>
    </>
  );
}

export default App;
