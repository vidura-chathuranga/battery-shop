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
} from "@mantine/core";

import { useForm } from "@mantine/form";
import AdminAPI from "../../../API/adminAPI/admin.api";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

// Checking login data
// const login = async (values : {email : string, password : string}) =>{
//     AdminAPI.login(values).then((response : any)=>{
//         console.log(response);
//     }).catch((error) =>{
//         console.log(error)
//     });
// }

// login component
const WorkerLoginPage = () => {
  const { classes } = useStyles();

  const loginForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
    },

    // validate data realtime
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back worker!
        </Title>

        {/* form */}
        <form
          onSubmit={loginForm.onSubmit(
            (values: { email: string; password: string }) => {
              // login(values)
            }
          )}
        >
          {/* email */}
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...loginForm.getInputProps("email")}
          />
          {/* password */}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...loginForm.getInputProps("password")}
          />

          {/* login button */}
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default WorkerLoginPage;
