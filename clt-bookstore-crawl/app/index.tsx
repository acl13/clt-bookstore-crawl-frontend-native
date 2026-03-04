"use client";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();

  const numColumns = width > 900 ? 3 : width > 600 ? 2 : 1;

  const renderItem = ({ item }: { item: Bookstore }) => {
    const isSelected = selectedItems.some((s) => s._id === item._id);

    return (
      <TouchableOpacity onPress={() => handleSelect(item)} activeOpacity={0.8}>
        <View style={[styles.card, isSelected && styles.selectedCard]}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.metaText} numberOfLines={2}>
            📍 {item.address}
          </Text>

          <Text style={styles.metaText} numberOfLines={1}>
            {item.county} County
          </Text>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.linkButtonText}>Visit Website</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={`columns-${numColumns}`}
        data={bookstores}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        columnWrapperStyle={
          numColumns > 1 ? { justifyContent: "space-between" } : undefined
        }
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
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
    flex: 1,
    margin: 6,
    width: 300,
    height: 160, // fixed height for uniformity
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#6f00d6",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  metaText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  linkText: {
    fontSize: 14,
    color: "#6f00d6",
    marginTop: 6,
  },
  linkButton: {
    marginTop: 8,
    backgroundColor: "#6f00d6",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  linkButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
