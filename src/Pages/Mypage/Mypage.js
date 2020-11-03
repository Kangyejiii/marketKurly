import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import ListItem from "./Components/ListItem";
import RightArrowImg from "./RightArrowImg";
import { useNavigation } from "@react-navigation/native";

function Mypage() {
  const navigation = useNavigation();

  const handleClick = () => {
    //저 이거 추가했어욤~~
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <Info>
        <InfoText>회원 가입하고 </InfoText>
        <InfoText>다양한 혜택을 받아보세요!</InfoText>
        <MembershipBenefitBtn>
          <BtnText>{`가입 혜택 보기`}</BtnText>
          <RightArrowImg size={10} />
        </MembershipBenefitBtn>
        <SignInBtn onPress={handleClick}>
          <SignText>로그인/회원가입</SignText>
        </SignInBtn>
      </Info>
      <ListItem title="비회원 주문 조회" />
      <List>
        {DATA.map((el, idx) => (
          <ListItem key={idx} title={el.title} />
        ))}
      </List>
      <ListItem title="알림 설정" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.PaleGreyBackground};
`;

const Info = styled.View`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.White};
  padding: 15px 16px 20px 16px;
  margin-bottom: 10px;
`;

const InfoText = styled.Text`
  margin-top: 10px;
  font-size: 17px;
`;

const MembershipBenefitBtn = styled.TouchableOpacity`
  ${mixin.flex()};
  margin: 10px 0px;
`;

const BtnText = styled.Text`
  margin-right: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.MenuTabGrey};
`;

const SignInBtn = styled.TouchableOpacity`
  ${mixin.flex()}
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.color.MainPurple};
  border-radius: 5px;
`;

const SignText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.White};
`;

const List = styled.View`
  margin: 10px 0px;
`;

const DATA = [
  { title: "배송안내", to: "/" },
  { title: "공지사항", to: "/" },
  { title: "자주하는 질문", to: "/" },
  { title: "고객센터", to: "/" },
  { title: "이용안내", to: "/" },
  { title: "컬리소개", to: "/" },
];

export default Mypage;
