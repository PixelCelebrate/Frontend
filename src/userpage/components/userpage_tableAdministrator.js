import React from "react";
//In commons:
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'FirstName',
        accessor: 'FirstName',
    },
    {
        Header: 'LastName',
        accessor: 'LastName',
    },
    {
        Header: 'UserName',
        accessor: 'UserName',
    },
    {
        Header: 'Password',
        accessor: 'Password',
    },
    {
        Header: 'Birthday',
        accessor: 'Birthday',
    },
    {
        Header: 'Role',
        accessor: 'Role',
    },
    {
        Header: 'Email',
        accessor: 'Email',
    },
    {
        Header: 'DateOfJoining',
        accessor: 'DateOfJoining',
    },
];


//Pentru ordine:
const filters = [
    {
        accessor: 'UserName'
    }
];

class AdministratorTable extends React.Component
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
                //Search:
                search={filters}
                //3 sau 5:
                //pageSize={3}
                pageSize={5}
            />
        )
    }
}

export default AdministratorTable;












