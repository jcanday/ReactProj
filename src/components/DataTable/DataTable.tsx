import React , {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import {useFetch} from '../../custom-hooks'
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography } from '@mui/material';
import { MarvelForm } from '../../components/MarvelForm';

const columns: GridColDef[]=[
    {field:'id', headerName:'ID',width:90, flex:1},
    {field:'name',headerName:'Name',width:150},
    {field:'desc',headerName:'Description',width:150, flex:1},
    {field:'super_power',headerName:'Super Power',width:150},
    {field:'comics_appeared',headerName:'Comics Appeared In',width:150}
]

interface gridData{
    data:{
      id?:string;
    }
  }

export const DataTable = () => {
    let {charData, handleFetch} = useFetch();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = async () => {
      await serverCalls.delete(`${gridData[0]}`)
      handleFetch()
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h2">Characters</Typography>
            <DataGrid 
                          rows={charData} 
                          columns={columns} 
                          pageSize={5} 
                          checkboxSelection 
                          onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                          {...charData}  
                      />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
            <DialogContent>
              <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                <MarvelForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="warning">Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
    )

}