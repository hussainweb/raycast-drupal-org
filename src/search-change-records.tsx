import { List, ListItem } from "@raycast/api";
import { useEffect, useState } from "react";
import { SearchChangeRecordsState } from "./types";
import { getDrupalChangeRecords } from "./utils/do-change-record-api";

export default function Command() {
  const [state, setState] = useState<SearchChangeRecordsState>({});

  useEffect(() => {
    async function fetchRecords() {
      try {
        const feed = await getDrupalChangeRecords(state.searchString || "");
        setState({ records: feed });
      } catch (error) {
        setState({
          error: error instanceof Error ? error : new Error("Something went wrong"),
        });
      }
    }

    fetchRecords();
  }, []);
  return (
    <List isLoading={!state.records && !state.error}>
      {state.records?.map((item, index) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
