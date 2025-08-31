import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import useStore from "@/redux/store";
import { cn } from "@/utils/cn";

const FULL_PROGRESS = 100;

function FileButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setImage } = useStore();
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => inputRef.current?.click();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const [file] = files;

    setImage(file);
  };

  useEffect(() => {
    setIsVisible(progress === FULL_PROGRESS);
  }, [progress]);

  return (
    <>
      <button
        className={cn(
          "absolute px-3 py-2 font-medium text-gray-300 uppercase transition-[outline-offset,opacity] transform -translate-y-1/2 rounded-md cursor-pointer focus:outline-4 active:opacity-90 outline-2 outline-gray-300 hover:outline-offset-3 right-16 file-button top-1/2",
          {
            invisible: !isVisible,
            visible: isVisible,
          },
        )}
        type="button"
        onClick={handleButtonClick}
      >
        Use your image
      </button>
      <input
        accept="image/png, image/jpeg, image/jpg, image/webp"
        multiple={false}
        ref={inputRef}
        type="file"
        onChange={handleInputChange}
        hidden
      />
    </>
  );
}

export default FileButton;
