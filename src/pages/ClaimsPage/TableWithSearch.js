// import TradedVolume from "../../components/OverviewCard/TradedVolumes";
// import GlobalSearchBox from "./GlobalSearchBox";

import { descSort, defaultSort, ascSort } from "./icons";
import RowsNotFound from "./RowsNotFound";
// import DeskCTA from "../../components/CTA/DeskCTA.js";

// import AddIcon from "../../assets/AddIcon.svg";
// import HistoryIcon from "../../assets/HistoryIcon.svg";
// import { useHistory } from "react-router";
// import DropDown from "../../components/DropDown/DropDown";

const TableWithSearch = ({
  rows,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  state,
  setGlobalFilter,
  gotoPage,
  pageCount,
  setPageSize,
  prepareRow,
  title,
  subTitle,
}) => {
  const { pageIndex, pageSize, globalFilter } = state;

  //   const history = useHistory();
  return (
    <div className="overflow-auto">
      {/* <div className="px-4 pl-7 py-2 mb-5 mt-16 flex justify-between content-start">
        {title === "overview" && (
          <TradedVolume
            title="TRADE VOLUME"
            value="$8,200,89.795"
            title2="TRADES"
            value2="8,200,89.795"
          />
        )}
        {(title === "Holdings" || title === "Transaction History") && (
          <div className="text-white text-left ">
            <p className="text-subheading font-medium">{title}</p>
            <p className="text-caption-1 text-grayLabel font-semibold mb-5">
              {subTitle}
            </p>
          </div>
        )}
        {title === "overview" && (
          <GlobalSearchBox filter={globalFilter} setFilter={setGlobalFilter} />
        )}
        {title === "Holdings" && (
          <div>
            <div className="flex flex-row">
              <DeskCTA
                title={"ADD NEW ASSET"}
                classes="button mb-0 mr-3"
                icon={AddIcon}
                onClick={() => history.push("/newasset")}
              />
              <img
                src={HistoryIcon}
                alt="history"
                className="cursor-pointer"
                onClick={() => history.push("/history")}
              />
            </div>
          </div>
        )}
        {title === "Transaction History" && <DropDown />}
      </div> */}
      <div className="m-4 bg-black rounded-lg">
        {rows.length > 0 ? (
          <>
            <table
              {...getTableProps()}
              className="table-auto w-full mt-12 border-separate border-dark-50 border-b-0  text-left text-sm rounded-t-xl"
              style={{
                border: "0.5px solid #28272c",
                borderRadius: "16px! important",
              }}
            >
              <thead
                style={{ backgroundColor: "#161419", color: "#a59fb1" }}
                className="text-xs text-left w-full rounded-t-lg"
              >
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        style={{ borderBottom: "0.5px solid #28272c" }}
                        className="p-4 pt-5 text-lg text-left border border-l-0 border-r-0 border-t-0"
                      >
                        <div
                          className="flex flex-row items-center justify-start"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="ml-2 text-lg">
                            {column.render("Header")}{" "}
                          </div>
                          <div className="ml-1">
                            {column.canSort &&
                              (column.isSorted
                                ? column.isSortedDesc
                                  ? descSort
                                  : ascSort
                                : "")}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody
                {...getTableBodyProps()}
                style={{ color: "#a59fb1" }}
                className={`border ${
                  title !== "overview" && "h-20 overflow-auto"
                }`}
              >
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border ">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{ borderBottom: "0.5px solid #28272c" }}
                          className={`px-2 pl-4 ${
                            title === "overview" ? "py-2" : "py-2"
                          } border border-l-0 border-r-0 border-t-0`}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}{" "}
              </tbody>
            </table>
            <div className="w-full h-2 bg-black t-0 rounded-b-lg border-dark-50 border-t-0"></div>
          </>
        ) : (
          <RowsNotFound query={globalFilter} />
        )}

        {/* extras */}
        {/*   <div className="extras flex justify-end items-center p-4 w-full text-gray-600 text-sm">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="p-1 rounded mr-6 cursor-pointer bg-dark-400"
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} per page
              </option>
            ))}
          </select>

          <span className="mr-6">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>

          <span className="mr-6">
            <span className="mr-1">Go to page:</span>{" "}
            <input
              className="border rounded px-1 py-0.5 w-12 bg-dark-400 border-dark-300"
              min={1}
              max={pageCount}
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="disabled:opacity-50"
          >
            <p className="mr-4">{"<"}</p>
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="disabled:opacity-50"
          >
            <p className="ml-4">{">"}</p>
          </button>
        </div>
       */}
      </div>
    </div>
  );
};

export default TableWithSearch;
