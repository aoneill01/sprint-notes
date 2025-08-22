import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Content, Theme } from "@carbon/react";
import NotesHeader from "@/components/NotesHeader/NotesHeader";

export const Route = createRootRoute({
  component: () => (
    <>
      <Theme theme="g100">
        <NotesHeader />
      </Theme>
      <Content>
        <Outlet />
      </Content>
    </>
  ),
});
