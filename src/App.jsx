import { Toaster } from "react-hot-toast";
import { BundleProvider } from "./context/BundleContext";
import AppContent from "./AppContent";

function App() {
  return (
    <BundleProvider>
      <Toaster position="top-right" />
      <AppContent />
    </BundleProvider>
  );
}

export default App;