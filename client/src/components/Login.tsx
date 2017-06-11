import * as React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import * as H from 'history';

const FormItem = Form.Item;
import './Login.css';
import {FormComponentProps} from 'antd/lib/form/Form';

interface LoginFrom extends FormComponentProps {
    login: (username: string, password: string) => Promise<{ success: true }>;
    history: H.History;
}

class Login extends React.Component<LoginFrom, {}> {
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password).then(({success}) => {
                    if (success === true) {
                        this.props.history.replace('/');
                    }
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password"
                               placeholder="Password" />,
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export {WrappedNormalLoginForm as Login};
