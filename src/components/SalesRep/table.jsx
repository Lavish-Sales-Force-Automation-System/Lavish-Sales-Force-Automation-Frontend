//geting data
//update,delete,view,add button work 
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
//buttons
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
//icons
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from "@material-ui/icons/Delete";       
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import AddIcon from '@material-ui/icons/Add';

 

const useStyles = makeStyles(theme => ({     

  fab: {
    margin: theme.spacing(1),
    backgroundColor: "#018786"
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  icon:{
    color:"#018786"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
   color: "inherit",
   fontSize: "1.1em"
  
  },

}));

function CustomTable({ ...props }) {

  const { tableHead, tableData } = props;    //classes,tableHeadColor
  
  const classes = useStyles();

  return (
    <div> 
      <Paper>                                                                    
      <Fab  aria-label="add"  className={classes.fab}>         { /*Add button to add salesreps  //TODO use react-dom-router link for /salesRep/add} */  }
        <AddIcon />
      </Fab>                                                                              {/*className={classes.tableResponsive} TODO component that should render  */}
      <Table className={classes.table}>                                       
        {tableHead !== undefined ? (
          <TableHead >                             
            <TableRow >                              {/* className={classes.tableHeadRow}*/}
              {tableHead.map((prop, key) => {
                return (
                  <TableCell key={key} className={classes.tableHeadCell}>             
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} >                   {/*className={classes.tableBodyRow}*/}
                {prop.map((prop, key) => {
                  return (
                  <TableCell  key={key}>              {/*className={classes.tableCell}*/ }
                      {prop}
                    </TableCell>
                  );
                })}
                <TableCell>  
                    <IconButton  aria-label="view" >
                        <ViewIcon className={classes.icon}/>
                    </IconButton>       
                    <IconButton  aria-label="edit" >
                        <EditIcon className={classes.icon} />
                    </IconButton>
                    <IconButton  aria-label="delete">
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Fab variant="extended" size="medium"  aria-label="export"  className={classes.fab}>         { /*Add button to add salesreps*/}
        <GetAppIcon className={classes.extendedIcon}/>
        Export
      </Fab>  
      </Paper>
    </div>
  );
}


export default CustomTable; 
