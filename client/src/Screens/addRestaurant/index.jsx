import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Input from '../../Components/Input';
import Select from '../../Components/SelectInput'
import Button from '../../Components/Button';
import { default as Cities } from './citiesInIsrael';
import { addRestaurant } from '../../API';
import Logo from '../../Components/Logo';

export default function AddRestaurant() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [branch, setBranch] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [logo_url, setLogo_url] = useState('');

  const [formError, setFormError] = useState(false);
  const [status, setStatus] = useState({})
  const [logoError, setLogoError] = useState(true)

  const citiesInIsrael = Cities.map(city => city.name);

  const checkIfNotValid = (value, min, max) => {
    if(value.length < min) {
      return `${"מינימום"} ${min} ${"תווים"}`;
    }
    if(value.length > max) {
      return `${"מקסימום"} ${max} ${"תווים"}`;
    }
    return false;
  };

  const HandleClick = () => {
    if(logoError || checkIfNotValid(name, 3, 25) || checkIfNotValid(shortDescription, 10, 50) || !citiesInIsrael.includes(city)) {
      setFormError(true);
      return;
    };
    
    (async function(){
      let doc = {
        name,
        city,
        shortDescription,
        logo_url,
      }

      if(branch) doc.branch = branch;
      
      try {
        const response = await addRestaurant(doc);
        
        console.log(response);
        console.log(await response.json());
        if(response.status !== 200) {
          return setStatus({ success: false, msg: response.status });
        }

        const data = await response.json();

        if(data.error) {
          return setFormError({ success: false, msg: data.error });
        }
        setStatus({ success: true });
      } catch {
        setStatus({ success: false, msg: 'שגיאה לא צפויה' });
      }
    })()
  }

  useEffect(() => setFormError(false), [name, city, branch, shortDescription, logo_url]);

  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1 className={styles.Headline}>הוספת מסעדה</h1>
        <div className={styles.Inputs}>
          <div className={styles.InputGroup}>
            <label>שם המסעדה</label>
            <Input
              placeholder={"הסרטן הפריך"}
              type={"text"}
              value={name}
              onChange={e => setName(e.target.value)}
              status={name.length ? checkIfNotValid(name, 3, 25) ? 'error' : 'success' : ''}
            />
            {name.length && checkIfNotValid(name, 3, 30) ? (
              <label className={styles.error}>{checkIfNotValid(name, 3, 25)}</label>
            ) : null}
          </div>
          <div className={styles.InputGroup}>
            <label>תיאור קצר</label>
            <Input
              placeholder={"מסעדת מזון מהיר"}
              type={"text"}
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              status={shortDescription.length ? checkIfNotValid(shortDescription, 10, 50) ? 'error' : 'success' : ''}
            />
            {shortDescription.length && checkIfNotValid(shortDescription, 10, 50) ? (
              <label className={styles.error}>{checkIfNotValid(shortDescription, 10, 50)}</label>
            ) : null}
          </div>
          <div className={styles.InputGroup}>
            <label>עיר</label>
            <Select
              placeholder={"עיר"}
              dropdownitems={citiesInIsrael || ["טוען עיר..."]}
              onSubmit={newVal => setCity(newVal)}
              defaulttext={"עיר לא קיימת"}
            />
          </div>
          <div className={styles.InputGroup}>
            <label>מיקום סניף בעיר (לא חובה)</label>
            <Input
              placeholder={`מערב`}
              type={"text"}
              value={branch}
              onChange={e => setBranch(e.target.value)}
              status={branch.length ? checkIfNotValid(branch, 0, 10) ? 'error' : 'success' : null}
            />
            {branch.length && checkIfNotValid(branch, 0, 10) ? (
              <label className={styles.error}>{checkIfNotValid(branch, 0, 5)}</label>
            ) : null}
          </div>
          <div className={styles.InputGroup}>
            <label>לוגו</label>
            <Input
              type={"txet"}
              placeholder={"קישור ללוגו"}
              value={logo_url}
              onChange={e => setLogo_url(e.target.value)}
              status={logo_url.length ? logoError ? 'error' : 'success' : null}
            />
            {logoError && logo_url.length ? (
              <label className={styles.error}>קישור אינו  תקין</label>
            ) : null}
          </div>
          <div className={styles.ImgGroup}>
            <Logo 
              url={logo_url}
              alt={"לוגו"}
              onLoad={() => setLogoError(false)}
              onError={() => setLogoError(true)}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <Button 
            type={"success"}
            onClick={HandleClick}
          >רישום מסעדה</Button>
          {formError ? (
            <label className={styles.error}>{"אנא מלאו את כל השדות הדרושים"}</label>
          ) : null}
        </div>
      </div>
    </div>
  )
}
