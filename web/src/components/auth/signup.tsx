import { useForm } from '@mantine/form';
import { Box, Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from '../../utils/axios';
import { set_user } from '../../store/slice/user';
import { useAppDispatch } from '../../store';

const Signup = () => {

    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            name: ''
        },
        validate: {
            name: (value) => (value.trim().length < 3 ? 'name must have at least 2 character' : null),
            username: (value) => (value.trim().length < 3 ? 'username must have at least 2 character' : null),
            password: (value) => (value.trim().length < 3 ? 'password must have at least 2 character' : null),
        }
    });

    const register = (values: typeof form.values) => {
        axios.post('/register', values).then(res => {
            dispatch(set_user(res.data))
        }).catch(error => {
console.log(error)
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
            <Title align="center">REGISTER</Title>
            <form onSubmit={form.onSubmit(register)}>
                <Box mt={10}>
                    <TextInput
                        mt={10}
                        label="Name"
                        {...form.getInputProps('name')}/>
                    <TextInput
                        mt={10}
                        label="username"
                        {...form.getInputProps('username')}/>
                    <PasswordInput
                        mt={10}
                        label="password"
                        {...form.getInputProps('password')}/>
                    <Button type="submit" mt={20} fullWidth>
                        register
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default Signup;
