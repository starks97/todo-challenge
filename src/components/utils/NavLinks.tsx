import Link from "next/link";
import { useRouter } from "next/router";

import { MenuItem, useColorModeValue } from "@chakra-ui/react";

interface NavProps {
  children: React.ReactNode;
  url: string;
}

export default function NavLink({ children, url }: NavProps): JSX.Element {
  const router = useRouter();
  const isActive = (router.pathname === url) as unknown as string;

  return (
    <Link href={url}>
      <MenuItem>{children}</MenuItem>
    </Link>
  );
}
