import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupItem,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@kirin/ui";
import Link from "next/link";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
  {
    title: "Something",
    href: "/something",
    description:
      "Something something something something something something something.",
  },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Group</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGroup>
              {components.map((component) => (
                <Link
                  key={component.title}
                  href={component.href}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuGroupItem title={component.title}>
                    {component.description}
                  </NavigationMenuGroupItem>
                </Link>
              ))}
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/something" legacyBehavior passHref>
            <NavigationMenuLink>Something</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
