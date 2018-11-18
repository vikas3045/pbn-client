import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import '../node_modules/react-tabs/style/react-tabs.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { Table, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import $ from 'jquery';

const apiUrl = 'http://ec2-13-233-166-180.ap-south-1.compute.amazonaws.com:3000/api/';

/////////////Custom Table//////////////
const columns = [
    { title: 'Claim ID', width: 100, dataIndex: 'claimId', key: 'claimId', fixed: 'left' },
    { title: 'Payer', width: 130, dataIndex: 'payer', key: 'payer', fixed: 'left', width: 150 },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', fixed: 'left', width: 200 },
    { title: 'UHID', dataIndex: 'uhid', key: 'uhid', width: 150 },
    { title: 'Admission Date', dataIndex: 'hospAdmissionDate', key: 'hospAdmissionDate', width: 200 },
    { title: 'Discharge Date', dataIndex: 'hospDischargeDate', key: 'hospDischargeDate', width: 200 },
    // { title: 'Statement From Date', dataIndex: 'StatementFromDate', key: 'StatementFromDate', width: 200 },
    // { title: 'Statement Thru Date', dataIndex: 'StatementThruDate', key: 'StatementThruDate', width: 200 },
    // { title: 'Member ID', dataIndex: 'MemberId', key: 'MemberId', width: 150 },
    // { title: 'Member Last Name', dataIndex: 'MemberLastName', key: 'MemberLastName', width: 150 },
    // { title: 'MemberFirstName', dataIndex: 'MemberFirstName', key: 'MemberFirstName', width: 150 },
    { title: 'Provider Facility Name', dataIndex: 'CL_ProviderFacilityName', key: 'CL_ProviderFacilityName', width: 150 },
    { title: 'Line Number', dataIndex: 'CL_LineNumber', key: 'CL_LineNumber', width: 150 },
    { title: 'Dos From', dataIndex: 'CL_DosFrom', key: 'CL_DosFrom', width: 150 },
    { title: 'Dos To', dataIndex: 'CL_DosTo', key: 'CL_DosTo', width: 150 },
    { title: 'Proc Code', dataIndex: 'CL_ProcCode', key: 'CL_ProcCode', width: 150 },
    { title: 'Quantity', dataIndex: 'CL_Quantity', key: 'CL_Quantity', width: 150 },
    { title: 'Diagnosis', dataIndex: 'CL_Diag1', key: 'CL_Diag1', width: 150 },
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId', width: 200 }
];

class CustomTable extends Component {
    constructor(props) {
        super();
        // this.state = {
        //     data: props.tableData
        // };
    }    
    // loadClaims() {
    //     $.ajax({
    //         url: apiUrl + 'ClaimTransaction',
    //         type: 'GET',
    //         contentType: 'application/json; charset=utf-8',
    //         dataType: 'json',
    //         success: function(responseData) {
    //             // this.setState({
    //             //     data: responseData
    //             // });
    //         }.bind(this),
    //         error: function(errorData) {
    //             debugger;
    //         }
    //     });
    // }
    componentDidMount() {
        //this.loadClaims();
    }
    render() {
        return ( <
            Table columns = { columns }
            dataSource = { this.props.tableData }
            scroll = {
                { x: 1500, y: 700 }
            }
            />
        );
    }
}

/////////PayerTable////////
const payerColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 50 },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 50 },
  { title: 'Email', dataIndex: 'email', key: 'email', width: 200 }
];

class PayerTable extends Component {
  constructor(props) {
      super();
      this.state = {
          data: []
      };
  }
  loadPayers() {
      $.ajax({
          url: apiUrl + 'Payer',
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
      this.loadPayers();
  }
  render() {
      return ( <
          Table columns = { payerColumns }
          dataSource = { this.state.data }
          scroll = {
              { x: 600 }
          }
          />
      );
  }
}

/////////Claim Form////////
class ClaimForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  postClaim = (postData) => {
      $.ajax({
        url: apiUrl + 'ClaimTransaction',
        type: 'POST',
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(responseData) {
            alert('Claim added successfully!');
        }.bind(this),
        error: function(errorData) {
            debugger;
        }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        values['$class'] = 'org.uspc.pbnet.ClaimTransaction';
        values['CL_LineNumber'] = '1';
        this.postClaim(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Claim ID"
        >
          {getFieldDecorator('claimId', {
            rules: [{ required: true, message: 'Please input Claim ID' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Payer"
        >
          {getFieldDecorator('payer', {
            rules: [{ required: true, message: 'Please input Payer' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="UHID"
        >
          {getFieldDecorator('uhid', {
            rules: [{ required: true, message: 'Please input UHID' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Patient Name"
        >
          {getFieldDecorator('patientName', {
            rules: [{ required: false, message: 'Please input Patient Name' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hospital Admission Date"
        >
          {getFieldDecorator('hospAdmissionDate', {
            rules: [{ required: false, message: 'Please input Hospital Admission Date' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Hospital Discharge Date"
        >
          {getFieldDecorator('hospDischargeDate', {
            rules: [{ required: false, message: 'Please input Hospital Discharge Date' }],
          })(
            <Input />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="Provider Facility Name"
        >
          {getFieldDecorator('CL_ProviderFacilityName', {
            rules: [{ required: false, message: 'Please input Provider Facility Name' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Dos From"
        >
          {getFieldDecorator('CL_DosFrom', {
            rules: [{ required: false, message: 'Please input Dos From' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Dos To"
        >
          {getFieldDecorator('CL_DosTo', {
            rules: [{ required: false, message: 'Please input Dos To' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Proc Code"
        >
          {getFieldDecorator('CL_ProcCode', {
            rules: [{ required: false, message: 'Please input Proc Code' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Quantity"
        >
          {getFieldDecorator('CL_Quantity', {
            rules: [{ required: false, message: 'Please input Quantity' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Diagnosis"
        >
          {getFieldDecorator('CL_Diag1', {
            rules: [{ required: false, message: 'Please input Diagnosis' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

class AddClaim extends Component{
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Claim
        </Button>
        <Modal
          title="Add Claim"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <WrappedClaimForm />
        </Modal>
      </div>
    );
  }
}

////////UHIDSearch/////////
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UHIDSearchForm extends React.Component {
  constructor(props){
    super();
    this.state ={
      tableData: []
    };
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.loadClaims();
  }

  loadClaims() {
    $.ajax({
        url: apiUrl + 'ClaimTransaction',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(responseData) {
            // this.setState({
            //     data: responseData
            // });
            this.setState({
              tableData: responseData
            });
        }.bind(this),
        error: function(errorData) {
            debugger;
        }
    });
}

  getClaim(sUhid) {
    debugger;
        $.ajax({
            url: apiUrl + 'queries/selectClaimTransactionByUhid',
            type: 'GET',
            data: {"uhid": sUhid.uhidSearch},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(responseData) {
                this.setState({
                  tableData: responseData
              });
            }.bind(this),
            error: function(errorData) {
                debugger;
            }
        });
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.getClaim(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const uhidSearchError = isFieldTouched('uhidSearch') && getFieldError('uhidSearch');
    return (
      <div>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={uhidSearchError ? 'error' : ''}
          help={uhidSearchError || ''}
        >
          {getFieldDecorator('uhidSearch', {
            rules: [{ required: true, message: 'Please input UHID' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="UHID" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Search
          </Button>
        </FormItem>
      </Form>
       <CustomTable tableData={this.state.tableData}/>
       </div>
    );
  }
}

class App extends Component{
    render(){
        return (
          <div>
            <nav className="navbar navbar-light bg-light">
              <span className="navbar-brand mb-0 h1">Change Squad</span>
            </nav>
            <div className="container-fluid">
            <Tabs>
                <TabList><Tab>Claims</Tab><Tab>Payers</Tab></TabList>
                <TabPanel>
                    <h2> Claims </h2>
                    <AddClaim />
                    <WrappedUHIDSearchForm />                   
                </TabPanel>
                <TabPanel>
                  <h2> Payers </h2>
                  <PayerTable />
                </TabPanel>
            </Tabs> 
            </div>
            </div>           
        );
    }
}

const WrappedClaimForm = Form.create()(ClaimForm);
const WrappedUHIDSearchForm = Form.create()(UHIDSearchForm);

export default App;