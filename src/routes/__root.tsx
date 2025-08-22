import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { Content, Theme } from "@carbon/react";
import TutorialHeader from "@/components/TutorialHeader/TutorialHeader";

export const Route = createRootRoute({
  component: () => (
    <>
      <Theme theme="g100">
        <TutorialHeader />
      </Theme>
      <Content>
        <Outlet />
      </Content>
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
