import React, { Component } from "react";
import { getRestaurants } from "../../API";
import Button from "../../Components/Button";
import { ReactComponent as Empty } from "../../ReSources/svgs/svgs/emptyReviews.svg";
import Content from "./Content";
import Filter from "./Filter";
import styles from "./style.module.css";
import { PlusIcon } from "../../ReSources/Icons";

export default class Restaurants extends Component {
  state = { data: [], dataToRender: [], CardsLength: 0, load: 30, loading: 30 };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await getRestaurants();

    if (!response.status === 200) return;

    const restaurants = await response.json();

    let data = restaurants.map((restaurant) => ({
      _id: restaurant._id,
      title: `${restaurant.name} ${restaurant.city}${` ${
        restaurant.branch || ""
      }`}`,
      description: restaurant.shortDescription,
      logo: restaurant.logo_url,
      score: restaurant.score,
      method: restaurant.payment_method,
    }));
    this.setState({
      data,
      dataToRender: data.slice(0, this.state.load),
      CardsLength: data.length,
    });
  };

  filterData = (filter) => {
    let newDataToRender = this.state.data.filter((item) =>
      item.title.includes(filter)
    );
    this.setState({
      CardsLength: newDataToRender.length,
      loading: this.state.load,
      dataToRender: newDataToRender.slice(0, this.state.load),
    });
  };

  LoadMore = () =>
    this.setState({
      loading: this.state.load + this.state.loading,
      dataToRender: this.state.data.slice(
        0,
        this.state.load + this.state.loading
      ),
    });

  render() {
    return (
      <div>
        <Filter filterData={this.filterData} />
        {this.state.dataToRender.length ? (
          <>
            <Content
              data={this.state.dataToRender}
              firstLoad={!this.state.dataToRender}
            />
            {this.state.dataToRender.length < this.state.CardsLength && (
              <div className={styles.LoadMore}>
                <a onClick={this.LoadMore}>טען עוד</a>
              </div>
            )}
          </>
        ) : (
          <div className={styles.Empty}>
            <Empty />
            <span>המסעדה לא קיימת במאגר, תרצו ליצור מסעדה?</span>
            <Button
              type={"error"}
              onClick={() => (window.location = "/add/restaurant")}
            >
              <span>ליצירת מסעדה</span>
              <PlusIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}
