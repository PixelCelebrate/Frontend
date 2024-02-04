import React, {Component} from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Field from "./fields/Field";
import {Col, Row} from "react-bootstrap";


class Table extends Component
{
    //Constructor:
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            columns: props.columns,
            search: props.search,
            filters: [],
            getTrPropsFunction: props.getTrProps,
            pageSize: props.pageSize || 10,
        };
    }

    search()
    {
    }

    filter(data) {
        let accepted = true;

        this.state.filters.forEach(val => {
            if (String(val.value) === "") {
                accepted = true;
            }

            if(!String(data[val.accessor]).startsWith(String(val.value)))
            {
                accepted = false;
            }
        });

        return accepted;
    }

    handleChange(value, index, header) {
        if (this.state.filters === undefined)
        {
            this.setState({filters: []});
        }

        this.state.filters[index] = {
            value: value.target.value,
            accessor: header
        };
        this.forceUpdate();
    }

    getTRPropsType(state, rowInfo) {
        if (rowInfo) {
            return {
                style: {
                    textAlign: "center"
                }
            };
        }
        else
            return {};
    }

    render() {
        let data = this.state.data ? this.state.data.filter(data => this.filter(data)) : [];

        return (
            <div>
                <Row style = {{width: '100%'}}>
                    {
                        this.state.search.map((header, index) => {
                            return (
                                <Col key={index}>

                                    <div>
                                        <Field id={header.accessor} label = {"Filter by " + header.accessor}
                                               onChange={(e) => this.handleChange(e, index, header.accessor)}/>
                                    </div>

                                </Col>
                            )
                        })
                    }
                </Row>
                <p></p>
                <Row>
                    <Col>
                        <ReactTable
                            data={data}
                            resolveData={data => data.map(row => row)}
                            columns={this.state.columns}
                            defaultPageSize={this.state.pageSize}
                            getTrProps={this.getTRPropsType}
                            showPagination={true}
                            style={{
                                height: '350px',
                                backgroundColor: 'rgba(200, 200, 200, 0.9)', 
                                // backgroundColor: 'rgba(0, 0, 255, 0.75)', 
                                // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                borderRadius: '1000px 1000px 1000px 1000px !important',
                                border: '#000000 solid 100px !important',
                                fontColor: 'black !important'
                            }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Table;




