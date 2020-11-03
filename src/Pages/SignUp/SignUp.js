import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import mixin from "../../Styles/Mixin";
import Title from "./Components/Title";
import useInputs from "./useInputs";
import { get, post } from "../../Api/api";
import CustomCheckBox from "../../Components/CheckBox";
import SubmitBtn from "../../Components/PurpleBtn";
import {
  ID,
  PASSWORD,
  CONFIRM_PASSWORD,
  NAME,
  EMAIL,
  PHONE,
  ADDRESS,
  BIRTH,
  GENDER,
} from "./data";
import { ScrollView } from "react-native-gesture-handler";
import AgreementToTerms from "./AgreementToTerms";
import mixIn from "../../Styles/Mixin";
import CreateAlert from "../../Components/Alert";

function SignUp() {
  const [form, onChange, onFocus, onChangeGuide] = useInputs();
  const { idGuide, pwGuide, confirmPwGuide } = form;
  const {
    account,
    password,
    name,
    email,
    phoneNumber,
    address,
    gender,
    birth,
  } = form.inputs;

  const handleDuplicateCheck = () => {
    console.log("diplicate");
    duplicateSubmit();
  };

  const handleSubmit = () => {
    if (!password) {
      CreateAlert("비밀번호를 입력하세요");
    }

    submit();
  };

  async function duplicateSubmit() {
    // const res = post("user/signup", { account: account });

    // await ;
    // console.log(res.message);

    if (res === "ACCOUNT_SUCCESS") {
      CreateAlert("사용하실 수 있는 아이디입니다!", () =>
        onChangeGuide("id", "isDuplicate", true)
      );

      if (res === "ACCOUNT_OVERLAPED") {
        CreateAlert("동일한 아이디가 이미 등록되어 있습니다", () =>
          onChangeGuide("id", "isDuplicate", false)
        );
      }
    }
  }

  async function submit() {
    const res = post("user/signup", form.inputs);
    console.log(res);
  }

  useEffect(() => {
    onChangeGuide("id", "isDuplicate", false);
    const regex = /^[a-zA-Z0-9]{6,}$/;
    return onChangeGuide("id", "isValidate", regex.test(account));
  }, [account]);

  useEffect(() => {
    onChangeGuide("pw", "isLong", password.length >= 10);

    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/gi);
    const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password.search(/\s/) != -1) {
      onChangeGuide("pw", "isValidate", false);
    } else if (
      (num < 0 && eng < 0) ||
      (eng < 0 && spe < 0) ||
      (spe < 0 && num < 0)
    ) {
      onChangeGuide("pw", "isValidate", false);
    } else {
      onChangeGuide("pw", "isValidate", true);
    }
  }, [password]);

  return (
    <Container>
      <ScrollView>
        <Wrapper>
          <Title text={ID.title} />
          <InputWrapper>
            <Input
              placeholder={ID.placeholder}
              flex={0.7}
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text, "account");
              }}
              onFocus={() => onFocus("id")}
              value={account}
            />
            <DuplicationBtn onPress={handleDuplicateCheck}>
              <Text color="purple">중복확인</Text>
            </DuplicationBtn>
          </InputWrapper>
          {idGuide.focus && (
            <GuideWrapper>
              <GuideText isValidate={idGuide.isValidate}>
                - 6자 이상의 영문 혹은 영문과 숫자를 조합
              </GuideText>
              <GuideText isValidate={idGuide.isDuplicate}>
                - 아이디 중복확인
              </GuideText>
            </GuideWrapper>
          )}
          <Title text={PASSWORD.title} />
          <Input
            placeholder={PASSWORD.placeholder}
            onChangeText={(text) => {
              onChange(text, "password");
            }}
            onFocus={() => onFocus("pw")}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
          />
          {pwGuide.focus && (
            <GuideWrapper>
              <GuideText isValidate={pwGuide.isLong}>
                - 10자 이상 입력
              </GuideText>
              <GuideText isValidate={pwGuide.isValidate}>
                - 영문/숫자/특수문자(공백 제외)만 허용하며,2개 이상 조합
              </GuideText>
              <Text>- 동일한 숫자 3개 이상 연속 사용 불가</Text>
            </GuideWrapper>
          )}
          <Title text={CONFIRM_PASSWORD.title} />
          <Input
            placeholder={CONFIRM_PASSWORD.placeholder}
            onChangeText={(text) => {
              const result = text === password;
              onChangeGuide("confirmPw", "isEqual", result);
            }}
            onFocus={() => onFocus("confirmPw")}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          {confirmPwGuide.focus && (
            <GuideWrapper>
              <GuideText isValidate={confirmPwGuide.isEqual}>
                - 동일한 비밀번호를 입력해주세요
              </GuideText>
            </GuideWrapper>
          )}
          <Title text={NAME.title} />
          <Input
            placeholder={NAME.placeholder}
            onChangeText={(text) => {
              onChange(text, "name");
            }}
            value={name}
          />
          <Title text={EMAIL.title} />
          <Input
            placeholder={EMAIL.placeholder}
            onChangeText={(text) => {
              onChange(text, "email");
            }}
            value={email}
          />
          <Title text={PHONE.title} />
          <InputWrapper>
            <Input
              placeholder={PHONE.placeholder}
              flex={0.6}
              keyboardType="numeric"
              onChangeText={(text) => {
                onChange(text, "phoneNumber");
              }}
              value={phoneNumber}
            />
            <PhoneBtn>
              <Text>인증번호 받기</Text>
            </PhoneBtn>
          </InputWrapper>
          <Title text={ADDRESS.title} />
          <Input
            placeholder={ADDRESS.placeholder}
            onChangeText={(text) => {
              onChange(text, "address");
            }}
            value={address}
          />
          <Title text={BIRTH.title} isRedDot={false} />
          <Input
            placeholder={BIRTH.placeholder}
            onChangeText={(text) => {
              onChange(text, "birth");
            }}
            value={birth}
          />
          <Title text={"성별"} isRedDot={false} />
          {GENDER.map((el, idx) => {
            return (
              <GenderBox key={idx}>
                <CustomCheckBox
                  isChecked={gender === el}
                  onClick={() => onChange(el, "gender")}
                  size={20}
                />
                <GenderLabel>{el}</GenderLabel>
              </GenderBox>
            );
          })}
        </Wrapper>
        <Bottom>
          <AgreementToTerms />
          <BtnWrapper>
            <SubmitBtn text="가입하기" onPress={handleSubmit} height="50" />
          </BtnWrapper>
        </Bottom>
      </ScrollView>
    </Container>
  );
}

const commonStyle = () => css`
  height: 48px;
  border: ${({ theme }) => theme.border.BorderGrey};
  border-radius: 4px;
  font-size: 14px;
`;

const Container = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  padding: 0px 24px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.color.White};
`;

const Bottom = styled.View`
  margin-top: 10px;
  padding-bottom: 20px;
  background-color: ${({ theme }) => theme.color.White};
`;

const Text = styled.Text`
  font-size: 12px;
  color: ${({ color, theme }) =>
    color === "purple" ? theme.color.MainPurple : "grey"};
`;

const Input = styled.TextInput`
  ${({ flex }) => flex && `flex: ${flex};`};
  ${commonStyle};
  padding: 0px 11px 1px 15px;
`;

const InputWrapper = styled.View`
  ${mixin.flex("row", "space-between", "center")};
`;

const DuplicationBtn = styled.TouchableOpacity`
  flex: 0.25;
  ${mixin.flex()};
  ${commonStyle};
  border: ${({ theme }) => theme.color.MainPurple};
`;

const PhoneBtn = styled.TouchableOpacity`
  flex: 0.35;
  ${mixin.flex()};
  ${commonStyle};
`;

const GuideWrapper = styled.View`
  padding-top: 10px;
`;

const GuideText = styled(Text)`
  ${({ isValidate }) => `color: ${isValidate ? "green" : "red"};`};
`;

const GenderBox = styled.View`
  ${mixIn.flex("row", "flex-start", "center")}
  margin : 10px 0px;
`;

const GenderLabel = styled.Text`
  font-size: 14px;
`;
const BtnWrapper = styled.View`
  margin: 0px 16px;
`;
export default SignUp;