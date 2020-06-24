// arr 的格式= [{id: 112233, name: '***'}]
export const ArrFindChildren = (arr) => {
  return arr
    .filter((i) => i.id.toString().substring(2, 6) === "0000")
    .map((i) => {
      const shen = i.id.toString().substring(0, 2);
      const shiData = arr
        .filter(
          (i) =>
            i.id.toString().substring(0, 2) === shen &&
            i.id.toString().substring(2, 4) !== "00" &&
            i.id.toString().substring(4, 6) === "00",
        )
        .map((i) => {
          const shi = i.id.toString().substring(0, 4);
          const qiData = arr
            .filter(
              (i) =>
                i.id.toString().substring(0, 4) === shi &&
                i.id.toString().substring(4, 6) !== "00",
            )
            .map((i) => ({
              value: i.id,
              label: i.name,
            }));
          return {
            value: i.id,
            label: i.name,
            children: qiData,
          };
        });
      return {
        value: i.id,
        label: i.name,
        children: shiData,
      };
    });
};

export const testData = [
  {
    value: 1,
    label: "1",
    children: [
      {
        value: 11,
        label: "11",
        children: [{ value: 111, label: "111" }],
      },
      {
        value: 12,
        label: "12",
        children: [
          { value: 121, label: "121" },
          { value: 122, label: "122" },
          { value: 123, label: "123" },
        ],
      },
      {
        value: 13,
        label: "13",
        children: [{ value: 131, label: "131" }],
      },
    ],
  },
  {
    value: 2,
    label: "2",
    children: [
      {
        value: 21,
        label: "21",
        children: [{ value: 211, label: "211" }],
      },
      {
        value: 22,
        label: "22",
        children: [
          { value: 221, label: "221" },
          { value: 222, label: "222" },
        ],
      },
      {
        value: 23,
        label: "23",
        children: [{ value: 231, label: "231" }],
      },
    ],
  },
  {
    value: 3,
    label: "3",
    children: [
      {
        value: 31,
        label: "31",
        children: [
          { value: 311, label: "311" },
          { value: 312, label: "312" },
        ],
      },
    ],
  },
];
