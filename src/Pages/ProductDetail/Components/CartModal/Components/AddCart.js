import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Container, Wrapper, ButtonTxt } from "../../Cart";
import { addCart } from "../../../../../config";

export default function AddCart({ removeModal }) {
  const [modal, setModal] = useState(true);

  const { data, cart } = useSelector(({ prodDataReducer: { data, cart } }) => ({
    data,
    cart,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    removeModal(modal);
  }, [modal]);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log("ACCESS_TOKEN를 가져오지 못했습니다.");
    }
  };

  const handleCart = () => {
    fetch(`${addCart}`, {
      method: "post",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.HWaXn9BKeUCMDZuYKDjDggGP-lV8hHTrlwWtAVjdq2I",
      },
      body: JSON.stringify({
        product_id: data.id,
        product_series_id: data.product_series
          ? Object.keys(cart).map((item) => {
              return Number(item);
            })
          : [],
        product_count: data.product_series
          ? Object.values(cart).map((item) => {
              return item.count;
            })
          : cart.undefined.count,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setModal(false);
        navigation.navigate("CartScreen");
      });
  };

  return (
    <Container>
      <Wrapper onPress={handleCart}>
        <ButtonTxt>장바구니에 담기</ButtonTxt>
      </Wrapper>
    </Container>
  );
}
