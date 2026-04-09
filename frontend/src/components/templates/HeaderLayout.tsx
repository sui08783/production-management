import { Box, Flex } from "@chakra-ui/react";
import { Header } from "../organisms/Header";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const HeaderLayout = (Props: Props) => {
  const { children } = Props;
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Box flex="1" overflow="auto">
        {children}
      </Box>
    </Flex>
  );
};
