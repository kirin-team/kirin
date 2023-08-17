import { useCommand } from "@components/Commander";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSecondary,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Keybind,
  KeybindGroup,
} from "@kirin/ui";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function ProfileDropdown() {
  const { setOpen } = useCommand();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/nemanjastanic.png" />
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[250px]">
        <DropdownMenuLabel>Nemanja Stanic</DropdownMenuLabel>
        <DropdownMenuLabel className="-mt-3 mb-1 font-normal text-accent-6">
          nemanjastanic@pm.me
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Open Kirin</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Command Menu
            <DropdownMenuSecondary>
              <KeybindGroup>
                <Keybind meta />
                <Keybind>K</Keybind>
              </KeybindGroup>
            </DropdownMenuSecondary>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<ExternalLinkIcon width={16} height={16} />}>
            Kirin Homepage
          </DropdownMenuItem>
          <DropdownMenuItem>Log Out</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button className="w-full">Upgrade to Pro</Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
