import { useState } from "react";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { MortarBoardIcon, SearchIcon, XIcon } from "@primer/octicons-react";
import {
  BorderBox,
  ButtonPrimary,
  Flex,
  Grid,
  Link,
  StyledOcticon,
  TextInput,
  Text,
  ButtonInvisible,
} from "@primer/components";

// Routes
import { POD } from "../../constants/routes";
import { MeQuery } from "../../generated/graphql";

interface PodsProps {
  me: MeQuery["me"];
  buttonProps: any;
}

const Pods: React.FC<PodsProps> = ({ me, buttonProps }) => {
  const pods = me?.pods ?? [];

  const [filterText, setFilterText] = useState("");

  const filteredList = pods
    .filter(({ name }) => name.toLowerCase().includes(filterText.toLowerCase()))
    .map(({ id, name }) => (
      <BorderBox key={id} padding={3} height={92}>
        <Flex mb={2} alignItems="center">
          <StyledOcticon icon={MortarBoardIcon} mr={2} />
          <Link
            as={RouterLink}
            to={generatePath(POD, { id })}
            fontWeight="bold"
            fontSize={1}
          >
            {name}
          </Link>
        </Flex>
        <Flex>
          <Text fontSize={1} color="gray.7">
            This is some nice info about pod!
          </Text>
        </Flex>
      </BorderBox>
    ));

  return (
    <>
      <Flex mb={3}>
        <TextInput
          icon={SearchIcon}
          placeholder="Find a pod..."
          width={1}
          mr={3}
          onChange={(e) => setFilterText(e.target.value)}
          value={filterText}
        />
        <ButtonPrimary {...buttonProps}>New</ButtonPrimary>
      </Flex>
      {pods.length !== filteredList.length && (
        <Flex mb={3} justifyContent="space-between">
          <Text fontSize={1}>
            <Text fontWeight="bold">{filteredList.length}</Text>
            <Text> result for pods matching </Text>
            <Text fontWeight="bold">{filterText}</Text>
          </Text>
          <ButtonInvisible onClick={() => setFilterText("")} paddingX={0}>
            <StyledOcticon icon={XIcon} mr={1} />
            Clear filter
          </ButtonInvisible>
        </Flex>
      )}
      <Grid gridTemplateColumns="1fr 1fr" gridGap={3} mb={3}>
        {filteredList}
      </Grid>
    </>
  );
};

export default Pods;
