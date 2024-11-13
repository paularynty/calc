import { useState } from "react";

const Calculator: React.FC = () => {
  const [cartValue, setCartValue] = useState<string>("");
  const [itemQty, setItemQty] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [total, setTotal] = useState<number | null>(null);

  const calculateTotalFee = () => {
    let baseFee: number = 2;
    const itemSurcharge: number = 0.5;
    const bulkFee: number = 1.2;

    const cartValueNumber = Math.max(Number(cartValue) || 0, 10);
    const distanceNumber = Number(distance) || 0;
    const itemQtyNumber = Number(itemQty) || 0;

    if (distanceNumber <= 1000) {
      baseFee = 2;
    } else if (distanceNumber >= 1001) {
      const extraDistance = distanceNumber - 1000;
      const extraFee = Math.ceil(extraDistance / 500);
      baseFee += extraFee;
    }

    if (itemQtyNumber >= 5) {
      const extraItems = itemQtyNumber - 4;
      const extraItemFee = Math.max(extraItems * itemSurcharge);
      baseFee += extraItemFee;
    }
    if (itemQtyNumber > 12) baseFee = baseFee + itemSurcharge + bulkFee;

    let total = baseFee;
    if (total > 15) total = 15;
    if (cartValueNumber >= 100) total = 0;

    if (date && time) {
      const orderDate = new Date(`${date}T${time}:00Z`);
      const isFriday = orderDate.getUTCDay() === 5; //if 5th day of the week, aka Friday
      const orderHour = orderDate.getUTCHours();
      const orderMinute = orderDate.getUTCMinutes();

      if (isFriday) {
        if (
          orderHour >= 15 &&
          orderHour <= 18 &&
          orderMinute >= 0 &&
          orderMinute <= 59
        ) {
          total *= 1.2;
        }
      }
    }

    total = Math.min(total, 15);

    setTotal(total);
  };

  const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCartValue(e.target.value);
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemQty(e.target.value);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(String(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(String(e.target.value));
  };

  return (
    <div className="box">
      <div className="search">
        <p>Cart value (in €)</p>
        <input
          className="input"
          type="number"
          min="0"
          value={cartValue}
          onChange={handleCartValueChange}
        />
      <p>Item quantity</p>
      <input
        className="input"
        type="number"
        min="0"
        value={itemQty}
        onChange={handleQtyChange}
        ></input>
      <p>Delivery distance (in meters)</p>
      <input
        className="input"
        type="number"
        min="0"
        value={distance}
        onChange={handleDistanceChange}
        ></input>
      <p>Delivery date</p>
      <input
        className="input"
        type="date"
        value={date}
        onChange={handleDateChange}
        ></input>
      <p>Delivery time</p>
      <input
        className="input"
        type="time"
        value={time}
        onChange={handleTimeChange}
        ></input>
      <div className="button-wrapper">
        <button onClick={calculateTotalFee}>Calculate</button>
      </div>
      {total !== null && (
          <div className="result">Total delivery fee: €{total}</div>
        )}
        </div>
    </div>
  );
};

export default Calculator;
