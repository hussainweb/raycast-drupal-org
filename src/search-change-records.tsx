import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { SearchChangeRecordsState } from "./types";
import { getDrupalChangeRecords } from "./utils/do-change-record-api";

export default function Command() {
  const [state, setState] = useState<SearchChangeRecordsState>({});
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    async function fetchRecords() {
      try {
        setState({ records: state.records, loading: true });
        const feed = await getDrupalChangeRecords(searchText || "");
        setState({ records: feed, loading: false });
      } catch (error) {
        console.error(error);
        setState({
          error: error instanceof Error ? error : new Error("Something went wrong"),
        });
      }
    }

    fetchRecords();
  }, [searchText]);

  return (
    <List
      isLoading={state.loading || (!state.records && !state.error)}
      searchBarPlaceholder={"Search for change records..."}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      throttle={true}
    >
      <List.EmptyView title={state.error ? "Error: " + state.error.message : ""}></List.EmptyView>
      {state.records?.map((item, index) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
