import React, { useState } from "react";
import { Col, Layout, Row, Button, Empty } from "antd";
import MovieCard from "../../components/MovieCard/MovieCard";
import { calculatePrice } from "../../utils/utils";
import { background_color_main } from "../../colors";
const { Content } = Layout;

const MyMovie = () => {
  const [favoritedMovies, setFavoritedMovies] = useState(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );

  const renderFavoriteMovies = () => {
    return (
      <>
        <Row gutter={[0, 32]}>
          <Button
            ghost
            danger
            onClick={() => {
              setFavoritedMovies([]);
              localStorage.clear();
            }}
          >
            Clear favorites Movie
          </Button>
        </Row>
        <Row gutter={[16, 16]}>
          {favoritedMovies.map((movie) => {
            const { poster_path, vote_average, title, overview, id } = movie;
            const isDisabled = favoritedMovies.find((movie) => {
              return movie.id === id;
            });
            return (
              <Col xs={24} md={12} lg={8} xl={6}>
                <div
                  style={{
                    color: "white",
                  }}
                >
                  <MovieCard
                    poster_path={poster_path}
                    id={id}
                    vote_average={vote_average}
                    title={title}
                    overview={overview}
                    price={calculatePrice(vote_average)}
                    disabled={isDisabled}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  const renderNoMovies = () => {
    return (
      <Row gutter={[16, 16]} justify={"center"}>
        <div
          style={{
            height: "69vh",
          }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span
                style={{
                  color: "white",
                }}
              >
                No favorite movies yet
              </span>
            }
          />
        </div>
      </Row>
    );
  };

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: background_color_main,
      }}
    >
      {favoritedMovies.length > 0 && renderFavoriteMovies()}
      {favoritedMovies.length === 0 && renderNoMovies()}
    </Content>
  );
};

export default MyMovie;
