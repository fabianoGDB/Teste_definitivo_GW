import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonIcon from '../../../../components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendRegister } from '../../../../util/requests';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthContext';
import { saveAuthData } from '../../../../util/storage';
import { getTokenData } from '../../../../util/token';

import './styles.css';

type CredentialsDTO = {
  Email: string;
  Password: string;
};

type LocationState = {
  from: string;
};

const Register = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/admin' } };

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsDTO>();

  const history = useHistory();

  const onSubmit = (formData: CredentialsDTO) => {
    requestBackendRegister(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">Erro ao tentar efetuar o cadastro</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('Email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.Email ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="Email"
          />
          <div className="invalid-feedback d-block">
            {errors.Email?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('Password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.Password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            name="Password"
          />
          <div className="invalid-feedback d-block">
            {errors.Password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Cadastrar" />
        </div>
        <div className="signup-container">
          <span className="not-registered">já tem Cadastro?</span>
          <Link to="/admin/auth/login" className="login-link-register">
            LOGAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
