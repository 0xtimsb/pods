import { useState } from "react";
import { Link as RouterLink, generatePath } from "react-router-dom";
import {
  MortarBoardIcon,
  SearchIcon,
  XIcon,
  ZapIcon,
} from "@primer/octicons-react";
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
  Box,
  Label,
  LabelGroup,
} from "@primer/components";

// Routes
import { POD } from "../../constants/routes";
import { MeQuery } from "../../generated/graphql";
import { timeAgo } from "../../utils/date";

interface PodsProps {
  pods: NonNullable<MeQuery["me"]>["pods"];
  buttonProps: any;
}

const Pods: React.FC<PodsProps> = ({ pods, buttonProps }) => {
  const [filterText, setFilterText] = useState("");

  const filteredList = pods
    .filter(({ name }) => name.toLowerCase().includes(filterText.toLowerCase()))
    .map(({ id, name, isAdmin, createdAt, description }) => (
      <BorderBox as={Flex} key={id} padding={3}>
        <Box mr={2}>
          <StyledOcticon icon={ZapIcon} size={16} />
        </Box>
        <Flex flexDirection="column" justifyContent="space-between">
          <Box>
            <Box mb={1}>
              <Link
                as={RouterLink}
                to={generatePath(POD, { id })}
                fontWeight="bold"
                fontSize={1}
                mr={2}
              >
                {name}
              </Link>
            </Box>
            <Box mb={1}>
              <Text fontSize={13} color="gray.5">
                {description.slice(0, 80)}
                {description.length > 81 && "..."}
              </Text>
            </Box>
          </Box>
          <Box>
            <Text fontSize={12}>{isAdmin ? "Admin • " : "Member • "}</Text>
            <Text fontSize={12}>Created {timeAgo(createdAt)} ago</Text>
          </Box>
        </Flex>
      </BorderBox>
    ));

  return (
    <Box>
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
    </Box>
  );
};

export default Pods;
