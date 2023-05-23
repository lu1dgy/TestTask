'use client';
import { useValidationForm } from '@/utils/hooks/useValidationForm';
import { ChangeEvent } from 'react';
import style from './Login.module.css';

const Login = () => {
  const { values, handleChange, errors, isValid } = useValidationForm();
  const submitForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={style.login}>
      <div className={style.login__container}>
        <h1 className={style.login__heading}>Рады видеть!</h1>
        <form className={style.login__form} onSubmit={submitForm}>
          <fieldset className={style.login__fieldset}>
            <label className={style.login__label}>
              <span className={style.login__span}>E-mail</span>
              <input
                className={`${style.login__input} ${
                  errors.email?.length > 0 ? style.login__input_error : ''
                }`}
                placeholder='Введите почту'
                type='email'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                required
              />
              <span className={style.login__error}>{errors.email || ''}</span>
            </label>
            <label className={style.login__label}>
              <span className={style.login__span}>Пароль</span>
              <input
                className={`${style.login__input} ${
                  errors.password?.length > 0 ? style.login__input_error : ''
                }`}
                placeholder='Введите пароль'
                type='password'
                name='password'
                minLength={2}
                maxLength={30}
                value={values.password || ''}
                onChange={handleChange}
                required
              />
              <span className={`${style.login__error}`}>{errors.password || ''}</span>
            </label>
          </fieldset>
          <button className={style.login__submit} type='submit'>
            Войти
          </button>
          <div className={style.login__enter}>
            <p className={style.login__question}>Ещё не зарегистрированы?</p>
            <a className={style.login__link} href={'/register'}>
              Регистрация
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
