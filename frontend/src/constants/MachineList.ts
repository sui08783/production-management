import { createListCollection } from "@chakra-ui/react";
import type { Machine } from "@/types/Machine";

const machines: Machine[] = [ "UNASSIGNED","MACHINE_A", "MACHINE_B", "MACHINE_C",];

export const machineList = createListCollection({
  items: machines.map((m) => ({
    value: m,
    label: m,
  })),
});
