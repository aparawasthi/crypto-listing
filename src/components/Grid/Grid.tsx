import React, { EventHandler } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { RowClickedEvent } from 'ag-grid-community';

import './Grid.scss';

interface GridProps {
  gridData: {}[];
  columnDefs: {}[];
  defaultColDef?: {};
  onRowClick?: (event: RowClickedEvent) => void;
}

function Grid({
  gridData,
  columnDefs,
  defaultColDef = {},
  onRowClick = () => {},
}: GridProps) {
  const rowClickHandler = (event: RowClickedEvent) => {
    onRowClick(event);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '80vh' }}>
      <AgGridReact
        rowData={gridData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowClass={'grid-row'}
        pagination={true}
        paginationPageSize={50}
        onRowClicked={rowClickHandler}
      ></AgGridReact>
    </div>
  );
}

export default Grid;
