import { ButtonInvisible, TabNav } from "@primer/components";
import { useState } from "react";

interface HomeTabNavProps {
  pods: () => void;
  invites: () => void;
}

const HomeTabNav: React.FC<HomeTabNavProps> = ({ pods, invites }) => {
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
      {section === "first" ? pods : invites}
    </>
  );
};

export default HomeTabNav;
