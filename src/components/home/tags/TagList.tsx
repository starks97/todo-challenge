import React, { useContext } from "react";

import { Grid, GridItem, Tag, Container } from "@chakra-ui/react";
import { TagContext, TagProps } from "../../../context/tag";

interface Props {
  tagsIds: string[];
}

export default function TagList({ tagsIds }: Props) {
  const { tag } = useContext(TagContext);

  const tags = tagsIds.map((id) => {
    return tag.find((element) => element.id === id) as TagProps;
  });

  return (
    <Container marginTop="0.5rem" justifyContent="start">
      <Grid
        gridTemplateRows={"repeat(1, 1fr)"}
        gridGap={{ base: "0.5rem", md: "1.3rem" }}
      >
        <GridItem>
          {tags.map((item) => (
            <Tag key={item.id} bg={item.color} w="4rem" m="0.3rem" />
          ))}
        </GridItem>
      </Grid>
    </Container>
  );
}
