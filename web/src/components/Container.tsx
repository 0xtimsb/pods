// Components
import { Flex, FlexProps } from "@primer/components";

const Container: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex flex={1} justifyContent="center" overflow="auto">
      <Flex width="65rem" style={{ minHeight: "min-content" }} {...props}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Container;
