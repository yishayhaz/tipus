import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

import Logo from '../../Components/Logo';
import Tag from '../../Components/Tag';
import StarRating from '../../Components/StarRating';
import Button from '../../Components/Button';

import { default as Tags } from '../../Components/Payment_method'

import { CreatedAtIcon, UpdatedAtIcon, QuestionMarkIcon, PlusIcon, SmileIcon, EllipsisIcon, ArrowUpIcon, ReportIcon } from '../../ReSources/Icons';
import { ReactComponent as EmptyReviewsSvg } from '../../ReSources/svgs/svgs/emptyReviews.svg';

import { getRestaurant } from '../../API';

export default function Restaurant() {
  const { id } = useParams();
  const GoTo = useNavigate();

  const [activeComment, setActiveComment] = useState(-1);
  const [activeSideMenu, setActiveSideMenu] = useState(-1);
  const [Restaurant, setRestaurant] = useState();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      (async function(){
        const response = await getRestaurant(id);
        const json = await response.json();

        if(response.status !== 200 || json.error) {
          setError(json.error);
          setLoading(false);
          return;
        }
        setRestaurant(json);
        setLoading(false);
      })()
    } catch {
      setLoading(false);
      setError(true);
    }
  }, [id]);

  if(error) return <>{error}</>
  else if(loading) return <>Loading...</>
  return (
    <div className={styles.Container}>
      <div className={styles.Headline}>
        <div className={styles.Logo}>
          <Logo url={Restaurant.logo_url}/>
        </div>
        <div className={styles.Headline_content}>
          <h1>{Restaurant.name} {Restaurant.city} {Restaurant.branch}</h1>
          <p>{Restaurant.shortDescription}</p>
        </div>
        <StarRating starts={Restaurant.score} animate={true} />
      </div>

      <div className={styles.Tag}>
        <Tag type={"success"}>משכורת + טיפים <SmileIcon /></Tag>
        <QuestionMarkIcon />
      </div>

      {/* ADD ALERT HERE */}

      <div className={styles.Dates}>
        <div>
          <label><CreatedAtIcon /></label>
          <span>{new Date(+Restaurant.createdAt).toISOString().split('T')[0]}</span>
        </div>
        <div>
          <label><UpdatedAtIcon /></label>
          <span>{new Date(+Restaurant.updatedAt).toISOString().split('T')[0]}</span>
        </div>
      </div>

      <div className={styles.Comments}>

        <div className={styles.Comments_head}>
          <div className={styles.Comments_head_title}>
            <h2>{"ביקורות"} ({Restaurant.reviews.length})</h2>
          </div>
          <div className={styles.Comments_head_btn}>
            <Button size={'small'} type={'success'} onClick={() => GoTo(`/add/review?id=${id}`, { state: JSON.stringify(Restaurant) })}>
              הוספת ביקורת <PlusIcon />
            </Button>
          </div>
        </div>

        {Restaurant.reviews.length ? Restaurant.reviews.map((review, index) => (
          <div key={index} className={styles.Comments_card}>
            <div className={styles.Info}>
              <div>
                <h3>{review.name}, {review.role}</h3>
                <span>{new Date(+review.createdAt).toISOString().split('T')[0]}</span>
              </div>
              <div className={styles.rates}>
                <div>
                  {Tags(review.payment_method)}
                  {/* <Tag type={"success"}>משכורת + טיפים <SmileIcon /></Tag> */}
                </div>
                <div>
                  <StarRating starts={review.score} animate={true} />
                </div>
              </div>
            </div>
            <div className={styles.Content}>
              <div className={styles.msg} onClick={() => setActiveComment(index)}>
                <p className={activeComment === index ? styles.large : styles.short}>
                  {review.comment}
                </p>
              </div>
              <div className={styles.actions}>
                <div onClick={() => activeSideMenu === index ? setActiveSideMenu(-1) : setActiveSideMenu(index)}>
                  <EllipsisIcon />
                </div>
                {activeSideMenu === index ? (
                  <div className={styles.dropDown}>
                    <button><span>דיווח</span><ReportIcon /></button>
                  </div>
                ) : null}
              </div>
              
              {activeComment === index ? (
                <div onClick={() => setActiveComment(-1)} className={styles.collapse}>
                  <ArrowUpIcon />
                </div>
              ) : null}
            </div>
          </div>
        )) : (
          <div className={styles.empty}>
            <EmptyReviewsSvg />
          </div>
        )}
      </div>
      <br />
      <br />
    </div>
  )
}
