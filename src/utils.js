export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function secondsToTime(e) {
  // let h = Math.floor(e / 3600)
  //   .toString()
  //   .padStart(2, "0");
  let m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return m + ":" + s;
}
