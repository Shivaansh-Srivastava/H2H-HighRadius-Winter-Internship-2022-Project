import React from 'react';
import {Grid,Button,ButtonGroup,TextField} from '@mui/material'
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import grid_columns from './gridcol';
import row_list from './newrows';
import asRecords from './rows_data'
import axios from 'axios';
import group from './Images/Group_20399.svg'
import highradius from './Images/logo.svg'
import './App.css';


class App extends React.Component
{
  constructor()
  {
    super()
    this.state={
      add:false,
      del:false,
      edit:false,
      advs:false,
      analytics:false,
      enDel:true,
      enEdit:true,
      toDel:true,
      toEdit:false,
      asData:false,
      search:"",
      editRows:{},
      idata:[],
      asDataV:[],
      detailsLoaded:false,
      resData:[],
      sRows: [],
      advanceSearchRows:[],
      editData:{
        edit_invc:"",
        edit_cpt:""
      },
      data:{
        Business_Code:"",
        Customer_Number:"",
        Clear_Date:"",
        Business_Year:"",
        Document_id:"",
        Posting_Date:"",
        Document_Create_Date:"",
        Due_Date:"",
        Invoice_Currency:"",
        Posting_Id:"",
        Total_Open_Amount:"",
        Baseline_Create_Date:"",
        Customer_Payment_Terms:"",
        Invoice_Id:""
      }
    }
    this.addOpen=this.addOpen.bind(this)
    this.addClose=this.addClose.bind(this)
    this.delOpen=this.delOpen.bind(this)
    this.delClose=this.delClose.bind(this)
    this.editOpen=this.editOpen.bind(this)
    this.editClose=this.editClose.bind(this)
    this.advanceOpen=this.advanceOpen.bind(this)
    this.advanceClose=this.advanceClose.bind(this)
    this.analyticsOpen=this.analyticsOpen.bind(this)
    this.analyticsClose=this.analyticsClose.bind(this)
    this.addSubmit=this.addSubmit.bind(this)
    this.onHandle=this.onHandle.bind(this)
    this.yesEdit=this.yesEdit.bind(this)
    this.onEditHandle=this.onEditHandle.bind(this)
    this.justPrint=this.justPrint.bind(this)
    this.yesDelete=this.yesDelete.bind(this)
    this.onAdvanceSearch=this.onAdvanceSearch.bind(this)
    this.doFilter=this.doFilter.bind(this)
  }

  componentDidMount()
  {
    axios.get('http://localhost:8080/H2H_servlets/FetchServlet')
    .then(response=>{
      this.setState({
        idata:response.data,
        detailsLoaded:true,
        asData:false,
        enDel:true,
        enEdit:true
      })
    })
  }

  doFilter(val)
  {
    const as_doc_id=document.getElementById('as_doc_id').value
    const as_bus_yr=document.getElementById('as_bus_yr').value
    const as_inv_id=document.getElementById('as_inv_id').value
    const as_cus_no=document.getElementById('as_cus_no').value
    if(val.doc_id===as_doc_id && val.buisness_year===as_bus_yr && val.invoice_id===as_inv_id && val.cust_number===as_cus_no)
      {
        return val
      }
  }

  onAdvanceSearch()
  {
    const as_doc_id=document.getElementById('as_doc_id').value
    const as_bus_yr=document.getElementById('as_bus_yr').value
    const as_inv_id=document.getElementById('as_inv_id').value
    const as_cus_no=document.getElementById('as_cus_no').value
    fetch('http://localhost:8080/H2H_servlets/FetchServlet').then((res) => res.json()).then((res) => {
      const asr=res.filter((val) => {
        return (val.buisness_year===parseInt(as_bus_yr)) && (val.invoice_id===parseInt(as_inv_id)) && (val.cust_number===parseInt(as_cus_no)) && (val.doc_id===parseInt(as_doc_id))
      })
      const nasr=asr.filter((v,i,a)=>a.findIndex(v2=>(v2.sl_no===v.sl_no))===i)
      console.log(nasr)
      this.setState({
        advanceSearchRows:nasr,
        asData:true
      })
    })
    this.setState({
      advs:false
    })
  }

  onEditHandle(e)
  {
    const newEditData={...this.state.editData}
    newEditData[e.target.id]=e.target.value
    this.setState({
      editData:newEditData
    })
    console.log(this.state.editData)
  }

  justPrint(rows)
  {
    row_list.push({...rows})
    console.log(row_list[row_list.length-1])
    //return row_list[0]
  }

  yesDelete()
  {
    const rids=row_list[row_list.length-1]
    axios.get('http://localhost:8080/H2H_servlets/delData',{
      params:{
        del_list:rids
      }
    }).then(response => {
      console.log("Data sent")
    })
    this.setState({
      del:false
    })
  }

  yesEdit()
  {
    if(row_list.length===1)
    {
    const invc=document.getElementById('edit_invc').value
    const cpt=document.getElementById('edit_cpt').value
    const rid=row_list[0][0]
    let estr="invc="+invc+"&cpt="+cpt+"&rid="+rid
    axios.get('http://localhost:8080/H2H_servlets/editServlet?'+estr)
    .then(response=>{
      console.log('Data sent')
    })
    this.setState({
      //toEdit:true,
      edit:false
    })
  }
  else
  {
    alert("Cannot update more than 1 record at a time.")
  }
  }

  addOpen()
  {
    this.setState({
      add:true
    })
  }

  addClose()
  {
    this.setState({
      add:false
    })
  }

  delOpen()
  {
    this.setState({
      del:true
    })
  }

  delClose()
  {
    this.setState({
      del:false
    })
  }

  editOpen()
  {
    this.setState({
      edit:true
    })
  }

  editClose()
  {
    this.setState({
      edit:false
    })
  }

  advanceOpen()
  {
    this.setState({
      advs:true
    })
  }

  advanceClose()
  {
    this.setState({
      advs:false
    })
  }

  analyticsOpen()
  {
    this.setState({
      analytics:true
    })
  }
  
  analyticsClose()
  {
    this.setState({
      analytics:false
    })
  }

  addSubmit(e)
  {
    e.preventDefault()
    const business_code= this.state.data.Business_Code 
    const cust_number= this.state.data.Customer_Number
    const clear_date= document.getElementById('Clear_Date').value
    const buisness_year= this.state.data.Business_Year
    const doc_id= this.state.data.Document_id
    const posting_date= this.state.data.Posting_Date
    const document_create_date= this.state.data.Document_Create_Date
    const due_in_date= this.state.data.Due_Date
    const invoice_currency= this.state.data.Invoice_Currency
    const document_type= this.state.data.Document_type
    const posting_id= this.state.data.Posting_Id
    const total_open_amount= this.state.data.Total_Open_Amount
    const baseline_create_date= this.state.data.Baseline_Create_Date
    const cust_payment_terms= this.state.data.Customer_Payment_Terms
    const invoice_id= this.state.data.Invoice_Id

    //console.log(this.state.data)

    let str="business_code="+ business_code+"&cust_number="+ cust_number+"&clear_date="+ clear_date+"&buisness_year="+ buisness_year+"&doc_id="+ doc_id+"&posting_date="+ posting_date+"&document_create_date="+ document_create_date+"&due_in_date="+ due_in_date+"&invoice_currency="+ invoice_currency+"&document_type="+ document_type+"&posting_id="+ posting_id+"&total_open_amount="+ total_open_amount+"&baseline_create_date="+ baseline_create_date+"&cust_payment_terms="+ cust_payment_terms+"&invoice_id="+ invoice_id

    axios.get('http://localhost:8080/H2H_servlets/AddData?'+str)
    .then(response => {
      console.log("Data sent successfully.")
    })
    this.setState({
      add:false
    })
  }

  onHandle(e)
  {
    const newData={...this.state.data}
    newData[e.target.id]=e.target.value
    this.setState({
      data:newData
    })
  }

  render()
  {
    const values = {
      someDate: "2017-05-24"
    }
    
      const row_data=this.state.idata
      const rowData=row_data.map(row =>{
        return {
          sl_no:row?.sl_no,
          business_code: row?.business_code,
          cust_number: row?.cust_number,
          clear_date: row?.clear_date,
          doc_id: row?.doc_id,
          buisness_year: row?.buisness_year,
          posting_date: row?.posting_date,
          document_create_date: row?.document_create_date,
          due_in_date: row?.due_in_date,
          invoice_currency: row?.invoice_currency,
          document_type: row?.document_type,
          posting_id: row?.posting_id,
          total_open_amount: row?.total_open_amount,
          baseline_create_date: row?.baseline_create_date,
          cust_payment_terms: row?.cust_payment_terms,
          invoice_id: row?.invoice_id,
        }
      })
      //console.log(rowData)
    return(
      <div className='main-dashboard'>
         <Dialog open={this.state.add} onClose={this.addClose}
        PaperProps={{
          style:{
            backgroundColor:'#364e5e',
            color:'white',
            height:'500px'
          }
        }}
        fullWidth
        maxWidth='lg'>
              <DialogTitle>
                ADD
              </DialogTitle>
              <DialogContent>
                <form  method='get' id="myform">
                <ul className='list-style'>
                  <li>
                    <TextField variant='filled' label="Business Code" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Business_Code"
                    value={this.state.data.Business_Code}
                    onChange={(e) => this.onHandle(e)}
                    />
                  </li>
                  <li>
                    <TextField variant='filled' label="Customer Number" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Customer_Number"
                    value={this.state.data.Customer_Number}
                    onChange={(e) => this.onHandle(e)}
                    />
                  </li>
                  <li>
                    <TextField variant='filled' type="date" label="Clear Date" //defaultValue={values.someDate}
                    sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Clear_Date"
                    //value={this.state.data.Clear_Date}
                    //onChange={(e) => this.onHandle(e)}
                    />
                  </li>
                  <li>
                    <TextField variant='filled' label="Business Year" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Business_Year"
                    value={this.state.data.Business_Year}
                    onChange={(e) => this.onHandle(e)}
                    />
                  </li>
                </ul>
                <ul className='list-style'>
                    <li>
                    <TextField variant='filled' label="Document id" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Document_id"
                    value={this.state.data.Document_id}
                    onChange={(e) => this.onHandle(e)}
                    />
                    </li>
                    <li>
                    <TextField variant='filled' type="date" label="Posting Date" //defaultValue={values.someDate}
                    sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Posting_Date"
                    value={this.state.data.Posting_Date}
                    onChange={(e) => this.onHandle(e)}
                    />
                    </li>
                    <li>
                    <TextField variant='filled' type="date" label="Document Create Date" //defaultValue={values.someDate}
                    sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Document_Create_Date"
                    value={this.state.data.Document_Create_Date}
                    onChange={(e) => this.onHandle(e)}
                    />
                    </li>
                    <li>
                    <TextField variant='filled' type="date" label="Due Date" //defaultValue={values.someDate}
                    sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Due_Date"
                    value={this.state.data.Due_Date}
                    onChange={(e) => this.onHandle(e)}
                    />
                    </li>
                </ul>
                <ul className='list-style'>
                      <li>
                      <TextField variant='filled' label="Invoice Currency" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Invoice_Currency"
                    value={this.state.data.Invoice_Currency}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                      <li>
                      <TextField variant='filled' label="Document type" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Document_type"
                    value={this.state.data.Document_type}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                      <li>
                      <TextField variant='filled' label="Posting Id" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Posting_Id"
                    value={this.state.data.Posting_Id}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                      <li>
                      <TextField variant='filled' label="Total Open Amount" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Total_Open_Amount"
                    value={this.state.data.Total_Open_Amount}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                </ul>
                    <ul className='list-style'>
                      <li>
                      <TextField variant='filled' type="date" label="Baseline Create Date" //defaultValue={values.someDate}
                    sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Baseline_Create_Date"
                    value={this.state.data.Baseline_Create_Date}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                      <li>
                      <TextField variant='filled' label="Customer Payment Terms" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Customer_Payment_Terms"
                    value={this.state.data.Customer_Payment_Terms}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                      <li>
                      <TextField variant='filled' label="Invoice Id" sx={{
                      backgroundColor:'white',
                      width:'250px',
                      borderRadius: 2
                    }}
                    id="Invoice_Id"
                    value={this.state.data.Invoice_Id}
                    onChange={(e) => this.onHandle(e)}
                    />
                      </li>
                </ul>
                <Button variant='outlined' onClick={(e) =>this.addSubmit(e)} sx={{
                  color:'white',
                  marginTop: '20px',
                  width: '550px',
                  marginRight: 1,
                  borderColor:'white',
                  marginLeft:'22.5px',
                }}
                >ADD</Button>
                <Button  variant="outlined" onClick={this.addClose} sx={{
                  color:'white',
                  marginTop: '20px',
                  width: '550px',
                  borderColor:'white',
                }}>CANCEL</Button>
                </form>
              </DialogContent>
        </Dialog>
        <Dialog open={this.state.del} onClose={this.delClose} 
        PaperProps={{
          style:{
            backgroundColor:'#364e5e',
            color:'white'
          }
        }}
        >
              <DialogTitle>
                Delete Records?
              </DialogTitle>
              <DialogContent>
                <span className='del-dialog'>Are you sure you want to delete these record[s]?</span>
                <br/>
                <Button variant='outlined' onClick={this.delClose} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 200,
                  marginRight: 1,
                  borderColor:'white'
                }}>CANCEL</Button>
                <Button  variant="outlined" onClick={this.yesDelete} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 200,
                  borderColor:'white'
                }}>DELETE</Button>
              </DialogContent>
        </Dialog>
        <Dialog open={this.state.edit} onClose={this.editClose} 
        PaperProps={{
          style:{
            backgroundColor:'#364e5e',
            color:'white'
          }
        }}>
              <DialogTitle>
                Edit
              </DialogTitle>
              <DialogContent>
                <form method="get">
                <TextField variant='filled' label='Invoice Currency' sx={{
                  background:'white',
                  marginRight: 3.5,
                  marginLeft:2.5,
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="edit_invc"
                onChange={(e) => this.onEditHandle(e)}
                />
                <TextField variant='filled' label='Customer Payment Terms' sx={{
                  background:'white',
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="edit_cpt"
                onChange={(e) => this.onEditHandle(e)}
                />
                <br/>
                <Button variant='outlined' onClick={this.yesEdit} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  marginRight: 1,
                  borderColor:'white'
                }}>EDIT</Button>
                <Button  variant="outlined" onClick={this.editClose} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  borderColor:'white'
                }}>CANCEL</Button>
                </form>
              </DialogContent>
        </Dialog>
        <Dialog open={this.state.advs} onClose={this.advanceClose} 
        PaperProps={{
          style:{
            backgroundColor:'#364e5e',
            color:'white'
          }
        }}>
              <DialogTitle>
                Advance Search
              </DialogTitle>
              <DialogContent>
                <TextField variant='filled' label='Document Id' sx={{
                  background:'white',
                  marginRight: 3.5,
                  marginLeft:2.5,
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="as_doc_id"
                />
                <TextField variant='filled' label='Invoice Id' sx={{
                  background:'white',
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="as_inv_id"
                />
                <br/>
                <TextField variant='filled' label='Customer Number' sx={{
                  background:'white',
                  marginRight: 3.5,
                  marginLeft:2.5,
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="as_cus_no"
                />
                <TextField variant='filled' label='Business Year' sx={{
                  background:'white',
                  marginBottom: 2.5,
                  borderRadius: 2
                }}
                id="as_bus_yr"
                />
                <br/>
                <Button variant='outlined' onClick={(e)=>{this.onAdvanceSearch()}} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  marginRight: 1,
                  borderColor:'white'
                }}>SEARCH</Button>
                <Button  variant="outlined" onClick={this.advanceClose} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  borderColor:'white'
                }}>CANCEL</Button>
              </DialogContent>
        </Dialog>
        <Dialog open={this.state.analytics} onClose={this.analyticsClose} 
        PaperProps={{
          style:{
            backgroundColor:'#364e5e',
            color:'white',
            height:'530px'
          }
        }}>
              <DialogTitle sx={{
                marginBottom:'20px'
              }}>
                Analytics View
              </DialogTitle>
              <DialogContent sx={{
                marginLeft:'25px'
              }}>
                <ul className='list-style-new'>
                  <li>
                    <h3>Clear Date</h3>
                  </li>
                  <li>
                  <h3>Due Date</h3>
                  </li>
                </ul>
                <ul className='list-style-txt'>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginRight: '66.5px',
                  marginTop:'10px',
                  borderRadius: 2,
                  }}/>
                  </li>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginTop:'10px',
                  borderRadius: 2
                  }}/>
                  </li>
                </ul>
                <ul className='list-style-txt'>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginRight: '66.5px',
                  marginTop:'5px',
                  borderRadius: 2,
                  }}/>
                  </li>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginTop:'5px',
                  borderRadius: 2
                  }}/>
                  </li>
                </ul>
                <ul className='list-style-news'>
                  <li>
                    <h3>Baseline Create Date</h3>
                  </li>
                  <li>
                  <h3>Invoice Currency</h3>
                  </li>
                </ul>
                <ul className='list-style-txt'>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginRight: '66.5px',
                  marginTop:'5px',
                  borderRadius: 2,
                  }}/>
                  </li>
                  <li>
                  <TextField variant='filled' label="Invoice Currency" sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginTop:'5px',
                  borderRadius: 2
                  }}/>
                  </li>
                </ul>
                <ul className='list-style-txt'>
                  <li>
                  <TextField variant='filled' type='date' sx={{
                  background:'white',
                  width:'200px',
                  marginBottom: 2.5,
                  marginRight: '66.5px',
                  marginTop:'5px',
                  borderRadius: 2,
                  }}/>
                  </li>
                </ul>
                <Button variant='outlined' onClick={this.analyticsClose} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  marginRight: 1,
                  borderColor:'white'
                }}>SUBMIT</Button>
                <Button  variant="outlined" onClick={this.analyticsClose} sx={{
                  color:'white',
                  marginTop: 2,
                  width: 250,
                  borderColor:'white'
                }}>CANCEL</Button>
              </DialogContent>
        </Dialog>
        <Grid container rowSpacing={0} direction="column" sx={{
          
        }}>
          <Grid container rowSpacing={0} sx={{
            paddingTop: 2,
            backgroundColor:'#364e5e'
          }}>
            <Grid item xs={0.5} />
            <Grid item xs={3}>
              <img src={group} alt="logo"/>
            </Grid>
            <Grid item xs={1.7} />
            <Grid item xs={4}>
              <img src={highradius} alt='HighRadius' />
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{
            color:'white',
            paddingTop:1.3,
            paddingLeft:7.2,
            paddingBottom:1.5,
            backgroundColor:'#364e5e'
          }}/>
          <Grid container columnSpacing={6} sx={{
            marginTop:2
          }}>
            <Grid item xs={4} sx={{
              marginLeft:5.5
              }}>
              <ButtonGroup variant='outlined' aria-label='outlined button group'>
                <Button variant="contained" sx={{
                  color: 'white'
                }}>PREDICT</Button>
                <Button sx={{
                  color: 'white'
                }} onClick={this.analyticsOpen}>ANALYTICS VIEW</Button>
                <Button sx={{
                  color: 'white'
                }} onClick={this.advanceOpen}>ADVANCE SEARCH</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined' sx={{
                  color: 'white',
                }}
                onClick={(e)=> document.location.reload(true)}
                >⟳</Button>
            </Grid>
            <Grid item xs={2}>
              <TextField variant='outlined' size='small' sx={{
                backgroundColor: 'white',
                borderRadius: 2
              }} placeholder="Search Customer Id" 
              />
            </Grid>
            <Grid item xs={1}>
              <Button variant="outlined" size='large' sx={{
                  color: 'white',
                  marginRight:'40px',
                  width:'130px'
                }} onClick={this.addOpen}>ADD</Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant='text' size='large' sx={{
                  color: 'white',
                  marginLeft:'20px',
                  width:'130px'
                }}  
                onClick={this.editOpen}
                disabled={this.state.enEdit}
                >EDIT</Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined' size='large' sx={{
                  color: 'white',
                  marginLeft: 5,
                  width:'130px'
                }} 
                onClick={this.delOpen}
                disabled={this.state.enDel}
                >DELETE</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{
            width:'1340px',
            marginTop:'30px',
            marginLeft:'40px'
          }}>
            {/*Data grid will come here.*/} 
            {this.state.asData?
            <DataGrid
              rows={this.state.advanceSearchRows}
              columns={grid_columns}
              getRowId={(row) => row.sl_no}
              pagination
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selRows={...ids}
                this.justPrint(selRows)
                this.setState({
                  sRows:selRows
                })
                if(Object.values(selRows).length>0)
                {
                  this.setState({
                    enEdit:false,
                    enDel:false
                  })
                }
                else
                {
                  this.setState({
                    enEdit:true,
                    enDel:true
                  })
                }
              }}
              sx={{
                height:'400px',
                color:'white',
                border:'none'
              }}
            />:<DataGrid
              rows={rowData}
              columns={grid_columns}
              getRowId={(row) => row.sl_no}
              pagination
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selRows={...ids}
                this.justPrint(selRows)
                this.setState({
                  sRows:selRows
                })
                if(Object.values(selRows).length>0)
                {
                  this.setState({
                    enEdit:false,
                    enDel:false
                  })
                }
                else
                {
                  this.setState({
                    enEdit:true,
                    enDel:true
                  })
                } 
              }}
              sx={{
                height:'400px',
                color:'white',
                border:'none'
              }}
            />}
          </Grid>
          <Grid item sx={{
            color:'white',
            textAlign:'center',
            marginTop:'30px'
          }}>
            <h3 className='footer'><Link>Privacy Policy</Link> | ©2022 HighRadius Corporation. All Rights Reserved.</h3>
          </Grid>
        </Grid>
       
      </div>
    )
  }
}

export default App
