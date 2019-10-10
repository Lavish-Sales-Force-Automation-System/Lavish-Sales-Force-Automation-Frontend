import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card,CardContent,CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";


const useStyles = (theme) => ({
    textField: { 
        marginLeft:theme.spacing(8),
       // marginRight:theme.spacing(1),
       width:'80%',
    },
    actionbuttons:{
        marginLeft:theme.spacing(7),
        marginRight:theme.spacing(8),
    },
    buttonsave:{
        /* marginTop:theme.spacing(1),
        marginLeft:theme.spacing(8),
        marginRight:theme.spacing(8), */
        color:theme.palette.common.white,
        backgroundColor:"#8EB69B",
        '&:hover':{
        backgroundColor:"#1b5e20",
        },
        width:'100%'
    },
    buttonclose:{
        /* marginTop:theme.spacing(1),
        marginLeft:theme.spacing(8),
        marginRight:theme.spacing(8), */
        
        width:'100%'
    },
     //modal styles
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    modalCard: {
        width: '90%',
        maxWidth: 700,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(2),
    },
});

 class Update extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            userName:'',
            fullName:'',
            area:'',
            address:'',
            phoneNo:'',
            nic:'',
            email:'',
           // password:'',
         //   confirmPassword:'',
            open:true,
            isExpire:false
        };
        this.onChange   = this.onChange.bind(this);
        this.onSubmit   = this.onSubmit.bind(this);
        this.openModal  = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // this.onUpdate = this.onUpdate.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.id] : e.target.value});
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/salesreps");
    }

    componentDidMount(){
        // e.preventDefault();
        const {match:{params}} =this.props;
        var token=localStorage.getItem("jwtToken");
        Axios
            .get(`/salesreps/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                this.setState({
                    userName:res.data.userName,
                    fullName:res.data.fullName,
                    area:res.data.area,
                    address:res.data.address,
                    phoneNo:res.data.phoneNo,
                    nic:res.data.nic,
                    email:res.data.email

                });
            })
            .catch(err=>{
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
            })
    }

    onSubmit = (e) => {

        const {match:{params}} =this.props;
        e.preventDefault();
        var token = localStorage.getItem('jwtToken')
        const salesrep = {
            userName : this.state.userName,
            fullName : this.state.fullName,
            area     : this.state.area,
            address  : this.state.address,
            phoneNo  : this.state.phoneNo,
            nic      : this.state.nic,
            email    : this.state.email,
          //  password : this.state.password,
           // confirmPassword : this.state.confirmPassword
        };
       
        Axios
            .put(`/salesreps/update/${params.id}`,salesrep,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.status === 200){
                   // window.location.reload();
                    this.setState({open:false});
                     this.props.history.push("/admin/salesreps");
                }
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
            })

    }

    render() {
        const { classes } = this.props;
        const { userName,fullName,area,address,phoneNo,nic,email,open,isExpire } = this.state;
        if(!isExpire){
        return (
            <Modal 
                className={classes.modal}
                onClose={this.closeModal}
                open={open}       
            >
                <Card className={classes.modalCard}>
                    <form onSubmit={this.onSubmit} >
                        <CardContent className={classes.modalCardContent}>
                            <TextField
                                required
                                autoFocus
                                id="userName"
                                label="User Name"
                                value={userName}
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                type="text"
                            />
                            <TextField
                                required
                                id="fullName"
                                label="Full Name"
                                value={fullName}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                required
                                id="address"
                                label="Address"
                                value={address}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                required
                                id="area"
                                label="Area"
                                value={area}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"       
                            />
                            <TextField
                                required
                                id="phoneNo"
                                label="Phone Number"
                                value={phoneNo}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                value={email}
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                type="email"
                            />
                            <TextField
                                required
                                id="nic"
                                label="NIC"
                                value={nic}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
                            {/* <TextField
                                required
                                id="password"
                                label="Password"
                                value={password}
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                type="password"
                            />
                            <TextField
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                type="password"
                            /> */}
                            <CardActions className={classes.actionbuttons}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.buttonsave} 
                                >
                                Save
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.buttonclose}  
                                    onClick={this.closeModal}
                                >
                                Close
                                </Button>
                            </CardActions>
                        </CardContent>
                    </form>
                </Card>
            </Modal>     
           
            
        );
        }
        else{
            return(
              <div>                
                  <Redirect to={{
                      pathname:"/login",
                      state:{expire:"Session expired please login again"}
                      }}/>
                  
              </div>
          )
          }
    }
}
export default withStyles(useStyles)(Update);