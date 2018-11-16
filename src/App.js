import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import { Table } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../node_modules/react-tabs/style/react-tabs.css';
import $ from 'jquery';


/////////////Custom Table//////////////

const apiUrl = 'http://ec2-52-66-208-195.ap-south-1.compute.amazonaws.com:3000/api/';
const columns = [
    { title: 'Claim ID', width: 100, dataIndex: 'claimId', key: 'claimId', fixed: 'left' },
    { title: 'Payer', width: 130, dataIndex: 'payer', key: 'payer', fixed: 'left' },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', width: 150 },
    { title: 'Admission Date', dataIndex: 'hospAdmissionDate', key: 'hospAdmissionDate', width: 150 },
    { title: 'Discharge Date', dataIndex: 'hospDischargeDate', key: 'hospDischargeDate', width: 150 },
    { title: 'Statement From Date', dataIndex: 'StatementFromDate', key: 'StatementFromDate', width: 150 },
    { title: 'Statement Thru Date', dataIndex: 'StatementThruDate', key: 'StatementThruDate', width: 150 },
    { title: 'Member ID', dataIndex: 'MemberId', key: 'MemberId', width: 150 },
    { title: 'Member Last Name', dataIndex: 'MemberLastName', key: 'MemberLastName', width: 150 },
    { title: 'MemberFirstName', dataIndex: 'MemberFirstName', key: 'MemberFirstName', width: 150 },
    { title: 'Provider Facility Name', dataIndex: 'CL_ProviderFacilityName', key: 'CL_ProviderFacilityName', width: 150 },
    { title: 'Line Number', dataIndex: 'CL_LineNumber', key: 'CL_LineNumber', width: 150 },
    { title: 'Dos From', dataIndex: 'CL_DosFrom', key: 'CL_DosFrom', width: 150 },
    { title: 'Dos To', dataIndex: 'CL_DosTo', key: 'CL_DosTo', width: 150 },
    { title: 'Proc Code', dataIndex: 'CL_ProcCode', key: 'CL_ProcCode', width: 150 },
    { title: 'CL_Quantity', dataIndex: 'CL_Quantity', key: 'CL_Quantity', width: 150 },
    { title: 'Diagnosis', dataIndex: 'CL_Diag1', key: 'CL_Diag1', width: 150 }
];

class CustomTable extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };

    }
    loadClaims() {
        $.ajax({
            url: apiUrl + 'claim',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(responseData) {
                this.setState({
                    data: responseData
                });
            }.bind(this),
            error: function(errorData) {
                debugger;
            }
        });
    }
    componentDidMount() {
        this.loadClaims();
    }
    render() {
        return ( <
            Table columns = { columns }
            dataSource = { this.state.data }
            scroll = {
                { x: 1500, y: 300 }
            }
            />
        );
    }
}

////////Tabs///////////

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class App extends Component {
    render() {
        return ( <
            Tabs >
            <
            TabList >
            <
            Tab > Claims < /Tab> <
            Tab > Title 2 < /Tab> < /
            TabList >

            <
            TabPanel >
            <
            CustomTable / > <
            /TabPanel> <
            TabPanel >
            <
            h2 > Any content 2 < /h2> < /
            TabPanel > <
            /Tabs>
        );
    }
}

export default App;