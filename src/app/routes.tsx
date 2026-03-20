import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AnalysisResult } from "./pages/AnalysisResult";
import { ClaimVerification } from "./pages/ClaimVerification";
import { ImageVerification } from "./pages/ImageVerification";
import { ExtensionPopup } from "./pages/ExtensionPopup";
import { Preferences } from "./pages/Preferences";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "analysis", Component: AnalysisResult },
      { path: "claim", Component: ClaimVerification },
      { path: "image", Component: ImageVerification },
      { path: "extension", Component: ExtensionPopup },
      { path: "preferences", Component: Preferences },
    ],
  },
]);
