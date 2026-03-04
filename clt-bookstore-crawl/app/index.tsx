"use client";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchBookstores } from "./store/slices/bookstoreData";
import { useAppDispatch } from "./store/configureStore";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

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
    }) => state.bookstores.data,
  );

  useEffect(() => {
    dispatch(fetchBookstores());
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState<Bookstore[]>([]);

  const handleSelect = (item: Bookstore) => {
    // Prevent duplicates
    if (!selectedItems.find((selected) => selected._id === item._id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }: { item: Bookstore }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <View
        style={{
          padding: 10,
          backgroundColor: "#f0f0f0",
          marginVertical: 5,
          borderRadius: 5,
        }}
      >
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookstores}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={3}
      />
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Selected Bookstores:
      </Text>
      {selectedItems.map((store) => (
        <Text key={store._id}>{store.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    fontWeight: "600",
  },
});
