import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import styled from "styled-components";
import CountBox from "./CountBox";
import { Number, OriginPrice } from "../../ProductDesc/Components/GoodsPrice";
import mixIn from "../../../../../Styles/Mixin";

const CartItem = () => {
  const { data } = useSelector(({ prodDataReducer: { data } }) => ({ data }));
  const [count, setCount] = useState(0);

  const handleCount = (item, price, num) => {
    setCount({ ...count, [item]: { price: price * num, count: num } });
  };

  useEffect(() => {
    console.log(count), console.log(data.id);
  }, [count]);

  //엑세스 토큰 (headers)
  //상품 아이디 & 시리즈 아이디 & 갯수

  return (
    <>
      <ScrollView>
        <Container>
          {data.product_series.length ? (
            <>
              {data.product_series.map((item) => (
                <>
                  <Name>{item.name}</Name>
                  <PriceWrapper>
                    <PriceBox>
                      <Box>
                        <Original>{`${item.price}원`}</Original>
                        <Discounted>{`${item.price}원`}</Discounted>
                      </Box>
                      <CountBox
                        id={item.product_series_id}
                        price={item.price}
                        handleCount={handleCount}
                      />
                    </PriceBox>
                  </PriceWrapper>
                </>
              ))}
              <TotalWrapper>
                <Title>합계</Title>
                <Total>{`${Object.values(count).reduce((a, b) => {
                  return a + b;
                }, 0)}원`}</Total>
              </TotalWrapper>
            </>
          ) : (
            <>
              <Name>{data.name}</Name>
              <PriceWrapper>
                <PriceBox>
                  <Box>
                    <Original>{`${data.price}원`}</Original>
                    <Discounted>{`${data.price}원`}</Discounted>
                  </Box>
                  <CountBox handleCount={handleCount} />
                </PriceBox>
              </PriceWrapper>
              <TotalWrapper>
                <Title>합계</Title>
                <Total>{`${Object.values(count) * data.price}원`}</Total>
              </TotalWrapper>
            </>
          )}
        </Container>
      </ScrollView>
    </>
  );
};

export default CartItem;

const Container = styled.View`
  margin: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.White};
`;

const Name = styled.Text`
  font-size: 14px;
`;

const PriceWrapper = styled.View`
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.color.FooterBackground};
`;

const PriceBox = styled.View`
  ${mixIn.flex("row", "space-between", "center")}
  padding-top: 25px;
  padding-bottom: 10px;
`;

const Box = styled.View`
  ${mixIn.flex("row", "center", "center")}
`;

const Original = styled(OriginPrice)`
  padding: 0;
  font-size: 12px;
`;

const Discounted = styled(Number)`
  padding-left: 2px;
  font-weight: 600;
  font-size: 14px;
`;

const TotalWrapper = styled.View`
  ${mixIn.flex("row", "space-between", "center")}
  padding-top: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
`;

const Total = styled(Discounted)`
  font-size: 16px;
`;