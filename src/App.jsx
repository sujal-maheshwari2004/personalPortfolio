import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const Writing = lazy(() => import("./pages/Writing"));
const WritingPost = lazy(() => import("./pages/WritingPost"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/:slug" element={<WritingPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
