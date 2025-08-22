import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "@carbon/react";
import { Switcher, Notification, UserAvatar } from "@carbon/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";

const NotesHeader = () => {
  const navigate = useNavigate();
  return (
    <Header aria-label="Sprint Notes">
      <HeaderName href="/" prefix="">
        Sprint Notes
      </HeaderName>
    </Header>
  );
};

export default NotesHeader;
