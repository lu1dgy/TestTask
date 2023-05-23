'use client';
import React, { ChangeEvent } from 'react';
import { useValidationForm } from '../../utils/hooks/useValidationForm';

import style from './Register.module.css';

const Register = () => {
  const { values, handleChange, errors, isValid } = useValidationForm();

  const submitForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className={style.register}>
      <div className={style.register__container}>
        <h1 className={style.register__heading}>Добро пожаловать!</h1>
        <form className={style.register__form} onSubmit={submitForm}>
          <fieldset className={style.register__fieldset}>
            <label className={style.register__label}>
              <span className={style.register__span}>E-mail</span>
              <input
                className={`${style.register__input} ${
                  errors.email?.length > 0 ? style.register__input_error : ''
                }`}
                placeholder='Введите почту'
                onChange={handleChange}
                value={values.email || ''}
                name='email'
                type='email'
                required
              />
              <span className={style.register__error}>{errors.email || ''}</span>
            </label>
            <label className={style.register__label}>
              <span className={style.register__span}>Пароль</span>
              <input
                className={`${style.register__input} ${
                  errors.password?.length > 0 ? style.register__input_error : ''
                }`}
                placeholder='Введите пароль'
                name='password'
                type='password'
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                value={values.password || ''}
                required
              />
              <span className={style.register__error}>{errors.password || ''}</span>
            </label>
          </fieldset>
          <button className={style.register__submit} type='submit' disabled={!isValid}>
            Зарегестрироваться
          </button>
          <div className={style.register__enter}>
            <p className={style.register__question}>Уже зарегистрированы?</p>
            <a className={style.register__link} href={'/login'}>
              Войти
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
