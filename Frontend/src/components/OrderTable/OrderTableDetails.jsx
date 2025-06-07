import React, { useState } from "react";
import Table from "./Table";
import OrderDetails from "./OrderDetails";

export default function OrderTableDetails({
  orders,
  filter,
  onCancelOrder,
  updateLoading,
}) {
  const [selected, setSelected] = useState(null);

  // Lọc đơn hàng theo filter, mặc định là tất cả
  const filteredOrders =
    filter === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="flex flex-col">
      {!selected ? (
        <Table
          data={filteredOrders}
          onSelect={setSelected}
          onCancelOrder={onCancelOrder}
          updateLoading={updateLoading}
        />
      ) : (
        <OrderDetails
          order={selected}
          onBack={() => setSelected(null)}
          // onCancelOrder={onCancelOrder}
          updateLoading={updateLoading}
        />
      )}
    </div>
  );
}
