import { DataGrid } from "@mui/x-data-grid";


function CustomTable({ columns, data }) {
  return (
    <div className="flex justify-center">
      <div style={{ height: 400, width: '100vw' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                expenseDes: false,

              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 40, 60, 100]}
        />
      </div>
    </div>
  );
}

export default CustomTable;
