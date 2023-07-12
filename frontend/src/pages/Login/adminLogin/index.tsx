import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
  } from '@mantine/core';

  import {useForm} from "@mantine/form";


  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: rem(900),
      backgroundSize: 'cover',
      backgroundColor: 'rgba(0, 0, 0, 100)',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: rem(450),
      maxWidth: rem(600),
      paddingTop: rem(80),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '50%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));


const AdminLoginPage = () =>{
    const { classes } = useStyles();

    const loginForm = useForm({
        validateInputOnChange: true,
    
        initialValues: {
          emailOrNic: "",
          password: "",
        },
    
       // Validate data in real-time
    validate: {
      emailOrNic: (value) => {
        if (!value) {
          return 'This field is required';
        }
        if (!/^\S+@\S+$/.test(value) && !/^([0-9]{9}[v|V]|[0-9]{12})$/.test(value)) {
          return 'Invalid email or NIC';
        }
        return null;
      },
    },
      });

    return(
    <div className={classes.wrapper} style={{ display: 'flex', justifyContent: 'center', 
    alignItems: 'center', height: '100vh', boxShadow: '0 2px 4px rgba(5, 5, 5, 0.2)' }}>
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back Owner
      </Title>

      {/* form */}
      <form
          onSubmit={loginForm.onSubmit(
            (values: { emailOrNic: string; password: string }) => {
              // login(values)
            }
          )}
        >

      <TextInput 
        label="Email address or NIC number"
        placeholder="hello@gmail.com"
        size="md"  
        {...loginForm.getInputProps("emailOrNic")}/>

      <PasswordInput 
        label="Password" 
        placeholder="Your password" 
        mt="md" 
        size="md" 
        {...loginForm.getInputProps("password")} />

      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md">
        Login
      </Button>

      </form>

      
    </Paper>
  </div>
);
};



export default AdminLoginPage;