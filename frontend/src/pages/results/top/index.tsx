import { useState } from "react";
import Header from "../components/Header";
import Footer from "@pages/search/components/Footer";
import ButtonGroup from "../components/ButtonGroup";
import * as T from "./styles";
import { useLocation } from "react-router-dom";
import { SearchRes } from "types/types";
import { convertServerDate } from "@utils/dateFormat";

export default function index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % searches.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + searches.length) % searches.length);
  };

  const location = useLocation();
  const { searches } = location.state;

  return (
    <T.Container>
      <Header
        subtitle="가장 비슷한 결과 최대 3개를 보여드려요."
        isScrolled={isScrolled}
        setIsScrolled={setIsScrolled}
        url="/search"
      />
      <T.Pagination $isScrolled={isScrolled}>
        <T.ArrowButton onClick={prevItem}>
          <T.LeftArrowIcon />
        </T.ArrowButton>
        {searches.map(
          (item: SearchRes, index: number) =>
            index === currentIndex && (
              <T.Item key={item.lostid}>
                <T.Image src={`http://3.37.100.150${item.image}`} alt={`Lost Item ${item.lostid}`} />
                <T.Details>
                  <T.Label>습득 물품</T.Label>
                  <T.Location>{item.title}</T.Location>
                </T.Details>
                <T.Details>
                  <T.Label>습득 장소</T.Label>
                  <T.Date>{item.getwhere}</T.Date>
                </T.Details>
                <T.Details>
                  <T.Label>습득 일자</T.Label>
                  <T.Date>{convertServerDate(item.lostdate)}</T.Date>
                </T.Details>
                <T.Details>
                  <T.Label>보관 장소</T.Label>
                  <T.Date>{item.nowwhere}</T.Date>
                </T.Details>
              </T.Item>
            ),
        )}
        <T.ArrowButton onClick={nextItem}>
          <T.RightArrowIcon />
        </T.ArrowButton>
      </T.Pagination>
      <ButtonGroup searches={searches} />
      <Footer />
    </T.Container>
  );
}
