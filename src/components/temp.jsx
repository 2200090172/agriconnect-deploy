import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState , useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import config from '../config';


const defaultTheme = createTheme();
export default function UserProfile() {
const [User,setUser] = useState({
  contact:Number,
email:String,
id:Number,
name:String,
password:String,
sex:String,
})
const [isUserVisisble,setIsUserVisisble] = useState(false)
const [isUserUpdateVisisble,setIsUpdateUserVisisble] = useState(false)
const [isSessionExpired,setIsSessionExpired] = useState(false)
const [isError,setIsError] = useState(false);

    const [error,setError] = useState("")

    useEffect(()=>{
      fetchData()
      }, []);
   const fetchData =  async () => {
    try
    {
        const response = await axios.get(`${config.url}/checkusersession`);
        if (response.status === 200) 
        {
          if(response.data === "")
          {
           setIsSessionExpired(true) 
           setIsUserVisisble(false)
           setIsError(false);
           setIsUpdateUserVisisble(false)
          }
          else{
            setUser(response.data);
            setIsSessionExpired(false) 
            setIsUserVisisble(true)
            setIsUpdateUserVisisble(false)
            setIsError(false);
          }
        }
    } 
    catch (error) 
    {
      setIsSessionExpired(false) 
      setIsUserVisisble(false)
      setIsError(true);
      setIsUpdateUserVisisble(false)
      setError(error.message);
    }
    }

    const logout = async () =>{
       await axios.get(`${config.url}/logout`)
       fetchData()
    }
const UpdateUserProfile =  async(updatevalue) => 
{  try{
  if(updatevalue === 1)
    {
  const response = await axios.get(`${config.url}/checkusersession`);
  if (response.status === 200) 
  {
    if(response.data === "")
    {
      setIsSessionExpired(true) 
      setIsUserVisisble(false)
      setIsUpdateUserVisisble(false)
      setIsError(false);
    }
    else{
      setIsSessionExpired(false)
      setIsUserVisisble(false)
      setIsError(false);
      setIsUpdateUserVisisble(true)
      setUser(response.data)
    }
  }
}
else
{
  const response2 = await axios.post(`${config.url}/userprofileupdate`,User);
  if (response2.status === 200) 
    {
      if(response2.data === "")
      {
        fetchData()
      }
      else if(response2.data === 1) {
        await axios.get(`${config.url}/logout`);
        fetchData()
      }
      else{
        fetchData()
      }
    }

}
} 
catch (error) 
{
  setIsError(true);
  setError(error.message);
}
}
    
 
  return (
    <div style={{   paddingLeft:"250px" }}>
   {isUserVisisble && (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">{User.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">{User.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Sex</TableCell>
            <TableCell align="left">{User.sex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Contact</TableCell>
            <TableCell align="left">{User.contact}</TableCell>
          </TableRow>
          <TableRow>           
            <TableCell align="left"><button onClick={() => logout() }>logout</button></TableCell>
            <TableCell align="left"><button onClick={() => UpdateUserProfile(1)}>update</button></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

{isSessionExpired &&  (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Session Expired</TableCell>
          </TableRow>        
        </TableHead>
      </Table>
    </TableContainer>
  )
}
{ isError && (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{error}</TableCell>
          </TableRow>        
        </TableHead>
      </Table>
    </TableContainer>
  )
}
{isUserUpdateVisisble && (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

          <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Enter Details to Update Your Profile
          </Typography>
            <Grid container spacing={2}>            
              <Grid item xs={12}>
              <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={User.name}  onChange={(e)=>{User.name = e.target.value }} required/>
              </Grid>
              <Grid item xs={12}>
              <TextField id="outlined-basic" type="email" label="Email" variant="outlined" defaultValue={User.email}  slotProps={{input: {readOnly: true,},}} onChange={(e)=>{User.email = e.target.value }} required/>
              </Grid>              
              <Grid item xs={12}>
              <TextField  required id="outlined-basic" select label="Select Sex" defaultValue={User.sex} onChange={(e)=>{User.sex = e.target.value }}// helperText="Please select your currency" 
              > 
            <MenuItem key="1" value="Male">Male</MenuItem>
            <MenuItem key="2" value="FeMale">Female</MenuItem>          
        </TextField>
              </Grid>                 
              <Grid item xs={12}>
              <TextField id="outlined-basic" type="number" label="contact" variant="outlined" defaultValue={User.contact} onChange={(e)=>{User.contact = e.target.value }} required/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => UpdateUserProfile(2)}
            >
              update
            </Button>
            <Grid container justifyContent="flex-end">
             
            </Grid>
          </Box>
          {/* <Typography component="h1" variant="h5" style={{ display: isVisible ? 'block' : 'none' }}>
    {message}
      </Typography> */}
      </Container>
      
    </ThemeProvider>

          </TableRow>        
        </TableHead>
      </Table>
    </TableContainer>
  )
}
    </div>
  )
}