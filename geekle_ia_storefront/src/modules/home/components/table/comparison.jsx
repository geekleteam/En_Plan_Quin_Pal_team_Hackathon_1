
import React, { useState } from "react"
import { Table } from "@medusajs/ui"

const Comparison = ({table}) => {

  if(!table || table.length === 0) return <div></div>;

  const headers = Object.keys(table[0]);
  return (


    <Table  style={{margin: "30px"}}>
      <Table.Header className="border-t-0">
        <Table.Row className="text-ui-fg-subtle txt-medium-plus">
          {headers.map(header => <Table.HeaderCell  style={{textAlign: 'center', minWidth: header === 'description' ? "200px" : "100px"}} key={header}>{header}</Table.HeaderCell>)}
        </Table.Row>
      </Table.Header>
      <Table.Body className="border-t-0">
        {Object.values(table).map((row, i) =><Table.Row key={`row-${i}`} className="text-ui-fg-subtle txt-medium-plus">
          {Object.values(row).map((cell, j) => <Table.Cell style={{minWidth: headers[j] === 'description' ? "200px" : "100px"}} key={`row${i}cell${j}`}>{typeof cell === 'object' ? JSON.stringify(cell) : cell.toString()}</Table.Cell>)}
        </Table.Row>)}
      </Table.Body>
    </Table>
  )

}

export default Comparison;