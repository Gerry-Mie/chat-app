import { Box, Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from '../../utils/axios';
import { useAppDispatch } from '../../store';
import { set_user } from '../../store/slice/user';

const Login = () => {

    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => (value.trim().length < 3 ? 'username must have at least 2 character' : null),
            password: (value) => (value.trim().length < 3 ? 'password must have at least 2 character' : null),
        }
    });
    const login = (values: typeof form.values) => {
        axios.post('/login', values).then(res => {
            dispatch(set_user(res.data))
        }).catch(error => {

            if (error.response) {
                return showNotification({
                    title: 'Error',
                    message: error.response.data,
                    color: 'red'
                })
            }
            showNotification({
                title: 'Error',
                message: error.message,
                color: 'red'
            })
        })
    }

    return (
        <Paper shadow="md" p={20} withBorder>
            <Title align="center">LOGIN</Title>
            <form onSubmit={form.onSubmit(login)}>
                <Box mt={10}>
                    <TextInput
                        mt={10}
                        label="username"
                        {...form.getInputProps('username')}/>
                    <PasswordInput
                        mt={10}
                        label="password"
                        {...form.getInputProps('password')}/>
                    <Button type="submit" mt={20} fullWidth>
                        login
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default Login;
