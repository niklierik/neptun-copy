"use client";

import Header from "@/common/header";
import DataTable from "@/common/table";

export default function Data() {
  const email = "szia";
  const header = [
    "Név",
    "Lakcím",
    "Születési dátum",
  ]

  const rows = [
    ["Nagy András", "Anyád", "2019.09.09."],
    ["Alma Paprika", "Apád", "2018.09.09."]
  ]
  return (
    <main>
      <Header></Header>

      <DataTable header={header} rows={rows}></DataTable>

    </main>
  );
}
