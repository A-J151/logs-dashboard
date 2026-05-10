// import { useState, useEffect,useMemo } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function useTableState(data=[], limit=10){
  
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [page, setPage] = useState(
//     Number(searchParams.get("page")) || 1
//   );
//   const [sortField, setSortField] = useState(
//     searchParams.get("sort") || "timestamp"
//   );
//   const [sortOrder, setSortOrder] = useState(
//     searchParams.get("order") || "desc"
//   );
//    const [filters, setFilters] = useState({
//     keyword: searchParams.get("keyword") || "",
//     level: searchParams.get("level") || "",
//     source: searchParams.get("source") || "",
//     storeId: searchParams.get("storeId") || "",
//     txnId: searchParams.get("txnId") || "",
//     transactionType: searchParams.get("transactionType") || "",
//   });
//   useEffect(()=>{
//     setPage(Number(searchParams.get("page"))||1);
//     setSortField(searchParams.get("sort") || "timestamp");
//     setSortOrder(searchParams.get("order") || "desc");

//     setFilters({
//       keyword: searchParams.get("keyword") || "",
//       level: searchParams.get("level") || "",
//       source: searchParams.get("source") || "",
//       storeId: searchParams.get("storeId") || "",
//       txnId: searchParams.get("txnId") || "",
//       transactionType: searchParams.get("transactionType") || "",
//     });
//   }, [searchParams]);
//   const handleSort = (column) => {
//     // setSortField((prevField) => {
//     if (sortField === column) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//       // return prevField;
//     } else {
//       setSortField(column);
//       setSortOrder("asc");
//     }
//     setPage(1); 
//   };
// const sortedData = useMemo(() => {
//   return [...data].sort((a, b) => {
//     if (!sortField) return 0;

//     let aVal = a[sortField];
//     let bVal = b[sortField];

//     if (sortField === "timestamp") {
//       aVal = new Date(aVal);
//       bVal = new Date(bVal);
//     }

//     if (!aVal) return 1;
//     if (!bVal) return -1;

//     if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//     if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });
// }, [data, sortField, sortOrder]);
//     const totalPages = Math.ceil(sortedData.length / limit);
//   const paginatedData = useMemo(() => {
//   return sortedData.slice((page - 1) * limit, page * limit);
// }, [sortedData, page, limit]); 
// return {
//     page,
//     setPage,
//     sortField,
//     sortOrder,
//     handleSort,
//     filters,
//     setFilters,
//     paginatedData,
//     totalPages,
//   };
// }
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTableState(data = [], limit = 10) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [sortField, setSortField] = useState(
    searchParams.get("sort") || "timestamp"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "desc"
  );

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    level: searchParams.get("level") || "",
    source: searchParams.get("source") || "",
    storeId: searchParams.get("storeId") || "",
    txnId: searchParams.get("txnId") || "",
    transactionType: searchParams.get("transactionType") || "",
  });

  useEffect(() => {
    const delay=setTimeout(()=>{
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("sort", sortField);
    params.set("order", sortOrder);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);}, 400);
return()=>clearTimeout(delay);
  }, [page, sortField, sortOrder, filters]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortField) return 0;

      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "timestamp") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (!aVal) return 1;
      if (!bVal) return -1;

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

const updateFilter=(key,value)=>{
    setFilters((prev)=>({
        ...prev, 
        [key]:value,
    }))
    setPage(1);
}
const clearFilters=()=>{
    setFilters({
 keyword: "",
    level: "",
    source: "",
    storeId: "",
    txnId: "",
    transactionType: "",
    })
    toast.success("Filters cleared");
    setPage(1);
}
  const totalPages = Math.ceil(sortedData.length / limit);

  const paginatedData = useMemo(() => {
    return sortedData.slice((page - 1) * limit, page * limit);
  }, [sortedData, page, limit]);


  const handleSort = (column) => {
    if (sortField === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(column);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return {
    page,
    setPage,
    sortField,
    sortOrder,
    handleSort,
    filters,
    setFilters,
    paginatedData,
    totalPages,
    clearFilters,
    updateFilter
  };
}