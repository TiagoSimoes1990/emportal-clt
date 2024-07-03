// React API
import * as React from 'react';

// External components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// In-house components
import UserAvatar from '../../components/user-avatar';

// API
import { getRequest, postRequest, patchRequest } from '../../data/requests';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

// Images imports
import dummyUserProfile from '../../images/dummy-profile-pic-300x300-1.png'

import 'react-phone-number-input/style.css'

// Style Objects
const centerDivColDir = {
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center",
  backgroundColor: "#F9F7F7",
  height: "100%",
}

// Create a FormikContext
const FormikSubmitContext = React.createContext(null);

// Transitions
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// TODO: Add more field to validation
// Yup validation schema
const validationSchema = Yup.object({
  first_names: Yup.string().required('First name is required'),
  last_names: Yup.string().required('Last name is required'),
  birth_date: Yup.date()
  .required('Birth date is required')
  .max(new Date(), 'Birth date cannot be in the future'),
  newPassword: Yup.string()
  .min(8, 'Password must be at least 8 characters long'),
confirmNewPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

export default function ModalDialog(props) {

  // useState Hooks
  const [tabIsOpen, setTabIsOpen] = React.useState('Profile');

  // References
  const formikRef = React.useRef(null);

  // Function to handle de event of closing the modal
  const handleCloseModal = () => {
    props.onClose();
    setTabIsOpen('Profile');
  }

  // Function to handle the click on save button
  // TODO: Disable save button if there are no changes to the form values
  const handleClickSave = () => {
    console.log("handleClickSave -> Submit form");
    formikRef.current?.submitForm();
    console.log(formikRef.current?.errors);
  }

  // Hook for debugging
  React.useEffect(() => {
    console.log("useEffect from 'Profile Tab'");
    console.log(props.expanded);
    console.log(props.userId);
  }, []);

  return (
    <FormikSubmitContext.Provider value={formikRef}>
      <Dialog
          fullScreen
          open={props.expanded}
          onClose={handleCloseModal}
          TransitionComponent={Transition}
        >
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {/* {userData.first_names + ' ' + userData.last_names} */}
                </Typography>
                <Button 
                  autoFocus color="inherit" 
                  onClick={handleClickSave}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
              <Grid container spacing={2} mt={7}>
                <Grid item xs={2}>
                    <ListItemButton
                      onClick={ () => {
                        setTabIsOpen('Profile');
                      }}>
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                      onClick={ () => {
                        setTabIsOpen('Absences');
                      }}>
                        <ListItemText primary="Absences"/>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                      onClick={ () => {
                        setTabIsOpen('Timesheet');
                      }}>
                        <ListItemText primary="Timesheet"/>
                    </ListItemButton>
                    <Divider />
                </Grid>
                <Grid item xs={10} >
                  <Profile
                    tabExpanded = {tabIsOpen} 
                    userId = {props.userId}>
                  </Profile>
                  <Absences
                    tabExpanded = {tabIsOpen} >
                  </Absences>
                  <Timesheet
                    tabExpanded = {tabIsOpen} >
                  </Timesheet>
                </Grid>
              </Grid>
      </Dialog>
    </FormikSubmitContext.Provider>
  );
}

// ------------------------
// Profile Tab
// ------------------------
const Profile = (props) =>  {

  const [showPassword, setShowPassword] = React.useState(false);
  const [editFields, setEditFields] = React.useState(false);
  const [userData, setUserData] = React.useState();

  const formikSubmitRef = React.useContext(FormikSubmitContext);


  // 
  // Function to request the update of user details on database
  const updateUserDetails = React.useCallback(async function updateUserDetails(newData, userId) {
    console.log("Update User Details was Triggered!!!");
    console.log("Data to be updated");
    console.log(newData);
    console.log(userId);
    try {
      const userUpdated = await patchRequest(`/users/update/${userId}`, newData);
    } catch (error) {
      console.log(error);
    }
  })

  // ---------------------------------------------------------
  // Function to fetch user details
  const fetchUserDetails = React.useCallback(async function fetchUserDetails(userID) {
    try {
      const userData = await getRequest(`/users/details/${userID}`);
      // If succeeded ...
      if (userData) {
        console.log("<< MENSAGEM DE RETORNO  - fetchUserDetails >>\n");
        console.log("Dados :" + JSON.stringify(userData));
        setUserData(userData);
      } 
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function toggles the visibility of the password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to prevent the default behavior when the mouse down event occurs. 
  // This is necessary to ensure the expected behavior when interacting with the password toggle, 
  // avoiding any unintended selections or other default behaviors.
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function toggles the edit of profile fields
  const handleClickEdit = () => setEditFields((edit) => !edit);

  // Function to handle Formik submit
  const handleSubmit = async (currentValues, {setSubmitting}) => {
    setSubmitting(true); //Disable submitting button

    const changedValues = {};

    // Compare initial and current values
    for (const field in currentValues) {
      if (currentValues[field] !== userData[field]) {
        changedValues[field] = currentValues[field];
      }
    }
    console.log('Initial form Values: ', userData);
    console.log('Changed values:', changedValues); 

    try {
      // await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay to test that the 'save button' is disabled
      const finalUserData = await transformUserData(changedValues);
      console.log("FINAL USER DATA TO SAVE ON DATABASE:");
      console.log(finalUserData);
      updateUserDetails(finalUserData,userData.id);
    } catch (error) {
      // Handle errors, show error messages, etc.
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false); // Re-enables submitting button
    }
  };

  // Function to transform user data according to database
  const transformUserData = async (data) => {
    return Object.entries(data).reduce((transformed, [key, value]) => {
      if (value !== undefined) { // Check if value exists
        if (key === 'birth_date' && value.$d) {
          transformed[key] = dayjs(value.$d).format('DD/MM/YYYY');
        } else if (key === 'newPassword' || key === 'confirmNewPassword') {
          transformed['passwd'] = value;
        } else {
          transformed[key] = value;
        }
      }
      return transformed;
    }, {});
  };

  // ----------------------------------
  // After rendering and after every update
  React.useEffect(() => {
    console.log("useEffect execution on Fullscreen Modal Dialog render");
    fetchUserDetails(props.userId);
  }, []);
  
  if (props.tabExpanded === 'Profile' && userData) {
    return (
          <Grid container spacing={2} height={'93vh'} p={3}>
            <Grid item md={4} flex={1}>
              <Paper elevation={3} style={centerDivColDir}>
                <UserAvatar
                  alt={userData.first_names}
                  src={userData.photo? userData.photo : dummyUserProfile}>
                </UserAvatar>
                <Typography gutterBottom variant="h5" component="div">
                  {userData.first_names + ' ' + userData.last_names}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  {userData.category_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ display: 'flex', flexDirection: 'row'}}>
                  <EmailIcon/>{userData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ display: 'flex', flexDirection: 'row'}}>
                  <SmartphoneIcon/>{userData.phone_number}
                </Typography>
                {/* Personal Data section */}
                <Divider style={{margin: '0.5rem', width:'95%'}}/>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h7" color="text.primary" component="div">
                    Personal Data
                  </Typography>
                  <Typography variant="h7" component="div">
                    <IconButton
                      aria-label="toggle edit option"
                      onClick={handleClickEdit}
                      edge="end"
                    >
                      {editFields ? <EditOffIcon/> : <EditIcon />}
                    </IconButton>
                  </Typography>
                </Stack>
                <Formik 
                  enableReinitialize={true}
                  initialValues={userData}
                  validationSchema={validationSchema}
                  innerRef={formikSubmitRef}
                  onSubmit={handleSubmit}
                >
                  {({errors, touched}) => ( 
                  <Form style={{width: '100%'}}>
                    <Grid container spacing={2} p={1}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='First Names'
                          name='first_names'
                          error={touched.first_names && Boolean(errors.first_names)}
                          helperText={touched.first_names && errors.first_names}
                        >
                        </Field>
                        <ErrorMessage name='first_names' component='div'/>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="Last Names"
                          name="last_names"
                          error={touched.last_names && Boolean(errors.last_names)}
                          helperText={touched.last_names && errors.last_names}
                        >
                        </Field>
                        <ErrorMessage name='last_names' component='div'/>
                      </Grid>
                      <Grid item xs={12}>
                        <LocalizationProvider 
                          dateAdapter={AdapterDayjs}>
                            <Field 
                              name ='birth_date'
                              error={touched.birth_date && Boolean(errors.birth_date)}
                              helperText={touched.birth_date && errors.birth_date}
                              >
                              {({field, form}) => (
                                <DatePicker
                                  {...field}
                                  format="DD/MM/YYYY"
                                  disabled={!editFields}
                                  label='Birth Date'
                                  renderInput={
                                      (params) => <TextField {...params} fullWidth variant='outlined'></TextField>
                                    }
                                    onChange={(date) => {
                                      form.setFieldValue('birth_date', date);
                                      console.log(form);
                                      console.log(form.touched);
                                    }}
                                  value={field.value ? dayjs(field.value) : null}
                                  onError={(error) => {
                                    form.setFieldError('birth_date', 'Invalid date format');
                                  }}>
                                </DatePicker>
                              )}
                            </Field>
                        </LocalizationProvider>
                        <ErrorMessage name='birth_date' component='div'></ErrorMessage> 
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="Prefix"
                          name="prefix_phone_number"
                          error={touched.prefix_phone_number && Boolean(errors.prefix_phone_number)}
                          helperText={touched.prefix_phone_number && errors.prefix_phone_number}
                          >
                        </Field>
                        <ErrorMessage name='prefix_phone_number' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={8}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="Phone Number"
                          name="phone_number"
                          error={touched.phone_number && Boolean(errors.phone_number)}
                          helperText={touched.phone_number && errors.phone_number}
                        >
                        </Field>
                        <ErrorMessage name='phone_number' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="Address"
                          name='address'
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        >
                        </Field>
                        <ErrorMessage name='address' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={5}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="Zip-Code"
                          name='zipcode'
                          error={touched.zipcode && Boolean(errors.zipcode)}
                          helperText={touched.zipcode && errors.zipcode}
                        >
                        </Field>
                        <ErrorMessage name='zipcode' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={7}>
                        <Field
                          as={TextField}
                          disabled={!editFields}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label="City"
                          name='city'
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                          >
                        </Field>
                        <ErrorMessage name='city' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={12}>
                        <Field 
                          name='newPassword'
                          error={touched.newPassword && Boolean(errors.newPassword)}
                          helperText={touched.newPassword && errors.newPassword}
                        >
                          {({field, form}) => (
                            <TextField
                              {...field}
                              disabled={!editFields}
                              fullWidth
                              variant='outlined'
                              label='New Password'
                              type={showPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge='end'>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton> 
                                  </InputAdornment>
                              ),
                            }}
                            error={form.touched.confirmPassword && Boolean(form.errors.confirmPassword)} // Show error if touched
                            helperText={form.touched.confirmPassword && form.errors.confirmPassword}
                            >
                          </TextField>
                          )}
                        </Field>
                        <ErrorMessage name='newPassword' component='div'></ErrorMessage>
                      </Grid>
                      <Grid item xs={12}>
                        <Field 
                          name='confirmNewPassword'
                          error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                          helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                        >
                          {({field, form}) => (
                            <TextField
                              {...field}
                              disabled={!editFields}
                              fullWidth
                              variant='outlined'
                              label='Confirm New Password'
                              type={showPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge='end'>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton> 
                                  </InputAdornment>
                              ),
                            }}
                            error={form.touched.confirmPassword && Boolean(form.errors.confirmPassword)} // Show error if touched
                            helperText={form.touched.confirmPassword && form.errors.confirmPassword}
                            >
                          </TextField>
                          )}
                        </Field>
                        <ErrorMessage name='confirmNewPassword' component='div'></ErrorMessage>
                      </Grid>
                      {/* About me section */}
                      <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Divider style={{margin: '0.5rem', width:'100%'}}/>
                          <Typography 
                            variant="h7" 
                            color="text.primary" 
                            component="div">
                            About Me
                          </Typography>
                          <Field
                            as={TextField}
                            disabled={!editFields}
                            fullWidth
                            variant='outlined'
                            type='text'
                            name='aboutme'
                            error={touched.aboutme && Boolean(errors.aboutme)}
                            helperText={touched.aboutme && errors.aboutme}
                            multiline
                            rows={4}
                          >
                          </Field>
                          <ErrorMessage name='aboutme' component='div'></ErrorMessage>
                      </Grid>
                    </Grid>
                  </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>
            <Grid item container spacing={2} md={8}>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Pendings
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Projects
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Skills
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
    )
  }
}

// ------------------------
// Absences Tab
// ------------------------
const Absences = (props) =>  {

  if (props.tabExpanded === 'Absences') {
    return(
      <Box>
          This is "Absences" tab
      </Box>
    )
  }
}

// ------------------------
// Timesheet Tab
// ------------------------
const Timesheet = (props) =>  {

  if (props.tabExpanded === 'Timesheet') {
    return(
      <Box>
          This is "Timesheet" tab
      </Box>
    )
  }
}