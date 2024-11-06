import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import * as A from "./styles";
import { useState } from "react";
import { SearchRes } from "types/types";

export default function index() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const { searches } = location.state;

  function moveToOne(lostid: number) {
    navigate("/found/one", {
      state: {
        lostid: lostid,
      },
    });
  }

  return (
    <A.Container>
      <Header
        subtitle="검색 결과를 모두 보여드려요"
        isScrolled={isScrolled}
        setIsScrolled={setIsScrolled}
        url="/results/top"
      />
      <A.FullItems $isScrolled={isScrolled}>
        {searches.map((item: SearchRes) => {
          const { lostid, image, getwhere, lostdate, category, title, nowwhere } = item;
          return (
            <A.Item type="button" key={lostid} onClick={() => moveToOne(lostid)}>
              <A.Image src={`http://3.37.100.150${image}`} alt={`Lost Item ${lostid}`} />
              <A.Details>
                <A.Title>{title}</A.Title>
                <A.Small>
                  <A.Found>{category}</A.Found>
                  <A.Found>{getwhere}</A.Found>
                  <A.Date>{lostdate}</A.Date>
                </A.Small>
                <A.Location>{nowwhere}</A.Location>
              </A.Details>
            </A.Item>
          );
        })}
      </A.FullItems>
    </A.Container>
  );
}
