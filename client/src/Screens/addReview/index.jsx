import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Button from '../../Components/Button';
import Input, { TextArea } from '../../Components/Input';
import Select from '../../Components/SelectInput';
import Slider from '@mui/material/Slider';
import StarRating from '../../Components/StarRating';
import { addReview } from '../../API';
const roles = [
  "waiter",
  "host",
  "chef",
  "cook",
  "barmen",
  "checker",
  "shift_manager",
  "manager",
  "מלצר/ית",
  "מארח/ת",
  "שף/ית",
  "טבח/ית",
  "ברמן/ית",
  "צ'קר/ית",
  "מנהל/ת משמרת",
  "מנהל/ת",
  'אחמ"ש/ית'
];

export default function AddReview(){
  const GoTo = useNavigate();
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get('id');

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [payment_method, setPayment_method] = useState('')
  const [score, setScore] = useState(25)

  const [error, setError] = useState(false)
  
  useEffect(() => {
    if(error) setError(false);
  }, [name, role, contact, comment, payment_method, score])

  const HandleSubmit = () => {
    let doc = {};
    if(name.length > 1 && name.length < 25) doc.name = name;
    if(roles.includes(role)) doc.role = role;
    if(comment.length > 20 && comment.length < 500) doc.comment = comment;
    if((score/10) >= 0.5 && (score/10) <= 5) doc.score = (score/10);
    if(payment_method >= 0 && payment_method < 4) doc.payment_method = payment_method;
    doc.contact = contact || 'anonymous';

    if(!(doc.name && doc.comment && doc.role && doc.score && doc.payment_method && doc.contact)){
      console.log(doc)
      return setError("אנא מלאו את כל השדות")
    }

    (async function(){
      const response = await addReview(doc, id);

      console.log(response)
      console.log(doc)
      console.log(await response.json())
      if(response.ok) {
        window.location.href=`/restaurant/${id}`;
      }
    })()
  }
  const checkIfNotValid = (value, min, max) => {
    if(value.length < min) {
      return `${"מינימום"} ${min} ${"תווים"}`;
    }
    if(value.length > max) {
      return `${"מקסימום"} ${max} ${"תווים"}`;
    }
    return false;
  };

  if(!id) return window.location.href='/'
  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1 className={styles.Headline}>הוספת ביקורת</h1>
        <div className={styles.Inputs}>
          <div className={styles.InputGroup}>
            <label>השם שלך</label>
            <Input
              placeholder={['ישראל ישראלי', 'ישראלה ישראלית'][Math.floor(Math.random()*2)]}
              type={"text"}
              value={name}
              onChange={e => setName(e.target.value)}
              status={name.length ? checkIfNotValid(name, 2, 25) ? "error" : "success" : "default"}
            />
            {name.length && checkIfNotValid(name, 2, 25) ? (
              <label className={styles.error}>{checkIfNotValid(name, 2, 25)}</label>
            ) : null}
          </div>
          <div className={styles.InputGroup}>
            <label>תפקיד</label>
            <Select
              placeholder="מלצר\ית, ברמן\ית..."
              dropdownitems={roles}
              onSubmit={(value) => setRole(value)}
              value={role}
            />
            {role.length && !roles.includes(role) ? (
              <label className={styles.error}>משהו פה לא מסתדר</label>
            ) : null}
          </div>
          <div className={styles.InputGroup}>
            <label>לא חובה. לא יוצג באתר.</label>
            <Input
              placeholder={"מייל / מספר טלפון שלך"}
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
          </div>
          <div className={styles.TextAreaGroup}>
            <label>ביקורת</label>
            <TextArea
              maxLength={500}
              placeholder={"ספרו לנו איך היה לעבוד שם, איך התייחסו אליכם ואיך הייתה האווירה הכללית"}
              value={comment}
              onChange={e => setComment(e.target.value)}
              status={comment.length ? checkIfNotValid(comment, 20, 500) ? 'error' : 'success' : ''}
            />
            <span>{comment.length}/500</span>
          </div>
          <div className={styles.Salary}>
            <div className={styles.Headline}>
              <h2>ואיך השכר שלכם?</h2>
            </div>
            <div className={styles.Option}>
              <input type="checkbox" id="first" checked={payment_method === 0} onChange={() => setPayment_method(0)}/>
              <label htmlFor="first">
              אתם מקבלים שכר בסיס, ובנוסף מקבלים את הטיפים ישירות אליכם.
              </label>
            </div>
            <div className={styles.Option}>
              <input type="checkbox" id="second" checked={payment_method === 1} onChange={() => setPayment_method(1)}/>
              <label htmlFor="second">
              אתם מקבלים שכר בסיס, והצוות מתחלק בכל הטיפים.
              </label>
            </div>
            <div className={styles.Option}>
              <input type="checkbox" id="third" checked={payment_method === 2} onChange={() => setPayment_method(2)}/>
              <label htmlFor="third">
              אתם מקבלים שכר בסיס, אבל הטיפים לא מגיעים אליכם.
              </label>
            </div>
            <div className={styles.Option}>
              <input type="checkbox" id="forth" checked={payment_method === 3} onChange={() => setPayment_method(3)}/>
              <label htmlFor="forth">
              אתם לא מקבלים שכר בסיס, אבל מקבלים את כל הטיפים.
              </label>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h2>בכללי, איך שם?</h2>
          </div>
          <div className={`${styles.TextAreaGroup} ${styles.SliderCont}`}>
            <div className={styles.Label}>
              <StarRating starts={score/10} animate={false}/>
            </div>
            <div className={styles.Slider}>
              <Slider
                value={score}
                onChange={(e, v) => setScore(v)}
                step={5}
                marks
                min={5}
                max={50}
              />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <Button 
            type={"success"}
            onClick={HandleSubmit}
          >הוספה</Button>
          {error ? (
            <label className={styles.error}>{error}</label>
          ) : null}
        </div>
      </div>
    </div>
  )
}