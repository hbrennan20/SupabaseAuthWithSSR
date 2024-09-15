import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface PitchToolsProps {
  onClearTags: () => void;
  onUndoTag: () => void;
  onShot: () => void;
  onTackle: () => void;
  onKickout: () => void;
  onTurnover: () => void;
  onTagTypeSelect: (type: string) => void;
}

const PitchTools: FC<PitchToolsProps> = ({
  onClearTags,
  onUndoTag,
  onShot,
  onTackle,
  onKickout,
  onTurnover,
  onTagTypeSelect,
}) => {

  return (
    <header className="py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-3xl">
      <div className="relative flex items-center justify-between bg-sky-300">
        <div className="flex items-center">
            <>
              <Button
                variant="text"
                onClick={onClearTags}
                sx={{ marginRight: 1 }}
              >
                Clear Tags
              </Button>
              <Button
                variant="text"
                onClick={onUndoTag}
                sx={{ marginRight: 1 }}
              >
                Undo Tag
              </Button>
              <Button
                variant="text"
                onClick={() => onTagTypeSelect('Shot')}
                sx={{ marginRight: 1 }}
              >
                Shot
              </Button>
              <Button
                variant="text"
                onClick={() => onTagTypeSelect('Tackle')}
                sx={{ marginRight: 1 }}
              >
                Tackle
              </Button>
              <Button
                variant="text"
                onClick={() => onTagTypeSelect('Kickout')}
                sx={{ marginRight: 1 }}
              >
                Kickout
              </Button>
              <Button
                variant="text"
                onClick={() => onTagTypeSelect('Turnover')}
                sx={{ marginRight: 1 }}
              >
                Turnover
              </Button>
            </>
        </div>
      </div>
    </header>
  );
};

export default PitchTools;
