import { BrowserRouter as Router } from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import AppRoutes from "./Routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Context/ThemeContextProvider";

function App() {
  const client = new QueryClient();
  return (
    <>
      <Router>
        <QueryClientProvider client={client}>
          <ThemeProvider>
            <LayOut>
              <AppRoutes />
            </LayOut>
          </ThemeProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
