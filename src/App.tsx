import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [totalHours, setTotalHours] = useState(
    parseInt(localStorage.getItem("totalHours") || "0")
  );
  const [totalMinutes, setTotalMinutes] = useState(
    parseInt(localStorage.getItem("totalMinutes") || "0")
  );
  const [remainingHours, setRemainingHours] = useState(
    parseInt(localStorage.getItem("remainingHours") || "0")
  );
  const [remainingMinutes, setRemainingMinutes] = useState(
    parseInt(localStorage.getItem("remainingMinutes") || "0")
  );

  //run calculations
  useEffect(() => {
    const total = totalHours * 60 + totalMinutes;
    const remaining = remainingHours * 60 + remainingMinutes;
    const elapsed = total - remaining;
    const percent = Math.round((elapsed / total) * 100);
    const display = isNaN(percent)
      ? "Audiobook % complete"
      : percent.toString().concat("% complete");
    setTitle(display);

    //save to storage
    localStorage.setItem("totalHours", String(totalHours));
    localStorage.setItem("totalMinutes", String(totalMinutes));
    localStorage.setItem("remainingHours", String(remainingHours));
    localStorage.setItem("remainingMinutes", String(remainingMinutes));
  }, [totalHours, totalMinutes, remainingHours, remainingMinutes]);
  return (
    <form>
      <legend>{title}</legend>
      <label>Total</label>
      <div>
        <input
          type="number"
          min="0"
          max="60"
          value={totalHours}
          onChange={(e) => {
            setTotalHours(parseInt(e.target.value));
          }}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          max="60"
          value={totalMinutes}
          onChange={(e) => {
            setTotalMinutes(parseInt(e.target.value));
          }}
        />
      </div>
      <label>Remaining</label>
      <div>
        <input
          type="number"
          min="0"
          max="60"
          value={remainingHours}
          onChange={(e) => {
            setRemainingHours(parseInt(e.target.value));
          }}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          max="60"
          value={remainingMinutes}
          onChange={(e) => {
            setRemainingMinutes(parseInt(e.target.value));
          }}
        />
      </div>
    </form>
  );
}
