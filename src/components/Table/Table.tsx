import { Table } from '@radix-ui/themes';
import React from 'react'

type Props<T extends Record<string, any>>={
  itemList:T[]
}

export default function CustomTable<T extends Record<string, any>>({itemList}:Props<T>) {
  const headers = itemList.length > 0 ? Object.keys(itemList[0]) : [];
  return (
    <Table.Root  style={{ width: '100%', borderCollapse: 'collapse' }}>
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.ColumnHeaderCell
                key={header}
                style={{
                  textAlign: 'center',
                  backgroundColor: '#f2f2f2',
                  color: '#333',
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
                {header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {itemList.map((item, index) => (
            <Table.Row key={index}>
              {headers.map((header) => (
                <Table.Cell
                  key={header}
                  style={{
                    textAlign: 'center',
                    padding: '10px',
                    border: '1px solid #ddd',
                  }}
                >
                  {item[header]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
    </Table.Root>
  )
}
