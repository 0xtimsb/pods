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
      <BorderBox key={id} padding={3}>
        <Flex alignItems="flex-start" mb={2}>
          <StyledOcticon icon={MortarBoardIcon} mr={2} />
          <Box>
            <Box>
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
            <Box>
              <Text fontSize={1} mb={2}>
                {description}
              </Text>
            </Box>
          </Box>
        </Flex>
        <LabelGroup>
          <Label
            variant="medium"
            outline
            borderColor="purple.4"
            color="purple.4"
          >
            You are {isAdmin ? "Admin" : "Member"}
          </Label>
          <Label variant="medium" outline borderColor="pink.4" color="pink.4">
            Created {timeAgo(createdAt)} ago
          </Label>
        </LabelGroup>
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
