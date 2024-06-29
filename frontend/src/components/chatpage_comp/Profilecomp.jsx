import React from "react";
import "preline/dist/preline.js";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useChatState } from "../../Context/ChatProvider";
const Profilecomp = () => {
  const [open, setOpen] = React.useState(false);

  const { user } = useChatState();
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div
        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 "
        onClick={handleOpen}
      >
        Profile
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader> {user.name}</DialogHeader>
        <DialogBody>{user.email}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Profilecomp;
