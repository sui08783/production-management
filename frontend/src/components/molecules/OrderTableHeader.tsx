import { Table } from "@chakra-ui/react";

export const OrderTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>ID</Table.ColumnHeader>
        <Table.ColumnHeader>商品名</Table.ColumnHeader>
        <Table.ColumnHeader>機械名</Table.ColumnHeader>
        <Table.ColumnHeader>状態</Table.ColumnHeader>
        <Table.ColumnHeader>納期</Table.ColumnHeader>
        <Table.ColumnHeader>数量</Table.ColumnHeader>
        <Table.ColumnHeader>作成日</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">操作</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  );
};
