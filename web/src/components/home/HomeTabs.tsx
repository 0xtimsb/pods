import { ButtonInvisible, TabNav } from "@primer/components";
import { useState } from "react";

// Graphql
import { MeQuery } from "../../generated/graphql";

// Components
import Invites from "./Invites";
import Pods from "./Pods";

interface HomeTabsProps {
  me: MeQuery["me"];
  buttonProps: {
    ref: React.MutableRefObject<null>;
    onClick: () => void;
  };
}

const HomeTabs: React.FC<HomeTabsProps> = ({ me, buttonProps }) => {
  const [section, setSection] = useState<"first" | "second">("first");

  return (
    <>
      <TabNav aria-label="Main" mb={3}>
        <TabNav.Link selected={section === "first"}>
          <ButtonInvisible color="black" onClick={() => setSection("first")}>
            Pods
          </ButtonInvisible>
        </TabNav.Link>
        <TabNav.Link selected={section === "second"}>
          <ButtonInvisible color="black" onClick={() => setSection("second")}>
            Invites
          </ButtonInvisible>
        </TabNav.Link>
      </TabNav>
      {section === "first" ? (
        <Pods me={me} buttonProps={buttonProps} />
      ) : (
        <Invites me={me} />
      )}
    </>
  );
};

export default HomeTabs;
