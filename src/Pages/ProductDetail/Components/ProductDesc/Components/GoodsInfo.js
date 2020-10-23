import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GoodsInfo = () => {
  const { data } = useSelector(({ prodDataReducer: { data } }) => ({ data }));

  return (
    <Container>
      <List>
        <Title>판매단위</Title>
        <Desc>{data.unit}</Desc>
      </List>
      <List>
        <Title>중량/용량</Title>
        <Desc>{data.weight}</Desc>
      </List>
      <List>
        <Title>배송구분</Title>
        {/* <Desc>{data.delivery_types.join("/")}</Desc> */}
      </List>
      <List>
        <Title>원산지</Title>
        <Desc>{data.origin}</Desc>
      </List>
      <List>
        <Title>포장타입</Title>
        <Desc>{data.shipping_type}</Desc>
      </List>
      <List>
        <Title>알레르기정보</Title>
        <Desc>{data.allergen}</Desc>
      </List>
      <List>
        <Title>안내사항</Title>
        <Desc>{data.information}</Desc>
      </List>
    </Container>
  );
};

export default GoodsInfo;

const Container = styled.View`
  margin: 19px 20px 0;
  padding: 10px 0 19px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.color.FooterBackground};
`;

const List = styled.View`
  flex-direction: row;
  padding-top: 10px;
`;

const Title = styled.Text`
  width: 85px;
  padding-right: 4px;
  font-size: 14px;
  color: #666;
  line-height: 20px;
`;

const Desc = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;