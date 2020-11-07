import React,{useState} from 'react'
import {Formik, Form,Field,ErrorMessage} from 'formik';
import  * as Yup from 'yup';
import ErrorText from '../../components/ErrorText'
import {signInWithGoogle,auth} from '../../Firebase/utils'
import Button from '../../components/Button'
import './style.scss'

const Login = () => {

    const [error, setError] = useState("")

    const initialValues = {
        email:'',
        password:''
    }
    
    const validationSchema = Yup.object( {
        email:Yup.string().email("Invalid Email").required('This field is required'),
        password:Yup.string().required('This field is required')
    })
    
    const onSubmit = async (values, onSubmitProps) => {
        try {
          await auth.signInWithEmailAndPassword(values.email, values.password);
          onSubmitProps.resetForm()
    
        } catch (err) {
          setError(err.message);
        }
      };

    return (
        <div className='login'>
           <h1 className='title' >Login</h1> 
           <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
            >
          <Form>
            {error && <ErrorText>{error}</ErrorText>}
            <Field
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            <ErrorMessage component={ErrorText} name='email' />
            <Field
              type="password"
              placeholder="Password"
              name="password"
            />
            <ErrorMessage component={ErrorText} name='password'/>

            <Button type='submit' >Login</Button>
        </Form>
      </Formik>
        
        <Button
      
          onClick={() => 
            signInWithGoogle()
          }
        >
          Login With Google
        </Button>
        </div>
    )
}

export default Login
