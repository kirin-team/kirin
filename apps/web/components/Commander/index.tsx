import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Keybind,
  KeybindGroup,
} from "@kirin/ui";
import {
  CalendarIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import React, { PropsWithChildren, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface CommandContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandContext = React.createContext<CommandContext>({
  open: false,
  setOpen: () => {},
});

export const useCommand = () => React.useContext(CommandContext);

export default function Commander({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  useHotkeys("meta+k", () => setOpen(true));

  return (
    <CommandContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <FaceIcon className="mr-2 h-4 w-4" />
              <span>Emoji Search</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>
                <KeybindGroup>
                  <Keybind meta />
                  <Keybind>P</Keybind>
                </KeybindGroup>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>
                <KeybindGroup>
                  <Keybind meta />
                  <Keybind>S</Keybind>
                </KeybindGroup>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandContext.Provider>
  );
}
