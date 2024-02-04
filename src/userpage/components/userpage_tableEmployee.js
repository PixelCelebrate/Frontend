import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'UserName',
        accessor: 'UserName',
    },
    {
        Header: 'Email',
        accessor: 'Email',
    },
];

const filters = [
    {
        accessor: 'UserName'
    }
];

class EmployeeTable extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default EmployeeTable;












