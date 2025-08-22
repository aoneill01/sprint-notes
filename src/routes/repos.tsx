import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/repos")({
  component: RouteComponent,
});

const headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "createdAt",
    header: "Created",
  },
  {
    key: "updatedAt",
    header: "Updated",
  },
  {
    key: "issueCount",
    header: "Open Issues",
  },
  {
    key: "stars",
    header: "Stars",
  },
  {
    key: "links",
    header: "Links",
  },
];

const rows = [
  {
    id: "1",
    name: "Repo 1",
    createdAt: "Date",
    updatedAt: "Date",
    issueCount: "123",
    stars: "456",
    links: "Links",
  },
  {
    id: "2",
    name: "Repo 2",
    createdAt: "Date",
    updatedAt: "Date",
    issueCount: "123",
    stars: "456",
    links: "Links",
  },
  {
    id: "3",
    name: "Repo 3",
    createdAt: "Date",
    updatedAt: "Date",
    issueCount: "123",
    stars: "456",
    links: "Links",
  },
];

function RouteComponent() {
  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
      }) => (
        <TableContainer
          title="Carbon Repositories"
          description="A collection of public Carbon repositories."
        >
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    <p>Row description</p>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
}
