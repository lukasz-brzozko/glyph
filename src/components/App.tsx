import { Loader } from "@react-three/drei";
import { Suspense } from "react";

import FileButton from "./FileButton";
import ThreeCanvas from "./ThreeCanvas";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ThreeCanvas />
      <FileButton />
    </Suspense>
  );
}

export default App;
