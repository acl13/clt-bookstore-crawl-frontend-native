"use client";
import { Text, View, FlatList } from "react-native";
import { fetchBookstores } from "./store/slices/bookstoreData";
import { useAppDispatch } from "./store/configureStore";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

type Bookstore = {
  _id: string;
  name: string;
  address: string;
  county: string;
  url: string;
  place_id: string;
};
export default function Index(this: any) {
  const dispatch = useAppDispatch();

  const bookstores = useSelector(
    (state: {
      bookstores: {
        initialState: boolean;
        data: Bookstore[];
        isLoading: boolean;
      };
    }) => state.bookstores.data
  );

  useEffect(() => {
    dispatch(fetchBookstores());
  }, [dispatch]);

  const logStores = () => {
    console.log(bookstores);
  };

  const renderItem = ({ item }: { item: Bookstore }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList data={bookstores} renderItem={renderItem} />
      <button onClick={logStores}>Log stores</button>
    </View>
  );
}
