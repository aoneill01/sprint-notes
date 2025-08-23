import {
  Header,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from "@carbon/react";
import { useMatch, useNavigate } from "@tanstack/react-router";

const NotesHeader = () => {
  const navigate = useNavigate();
  const standupMatch = useMatch({ from: "/", shouldThrow: false });
  const retrospectiveMatch = useMatch({ from: "/retro", shouldThrow: false });

  const overrideNav = (to: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    navigate({ to });
  };

  return (
    <Header aria-label="Sprint Notes">
      <HeaderName href="/" prefix="">
        Sprint Notes
      </HeaderName>
      <HeaderNavigation>
        <HeaderMenuItem
          onClick={overrideNav("/")}
          href="#"
          isActive={!!standupMatch}
        >
          Standup
        </HeaderMenuItem>
        <HeaderMenuItem
          onClick={overrideNav("/retro")}
          href="#"
          isActive={!!retrospectiveMatch}
        >
          Retrospective
        </HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
};

export default NotesHeader;
