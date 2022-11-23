import data from "../data/employees.json" assert { type: "json" };
import fs from "fs";

function getRandIdx(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const newData = data.slice(0, 100).map((x, i) => {
  let idx = i + 1;
  let offices = ["Lund", "Helsingborg", "Stockholm", "Borlänge", "Ljubljana"];
  let trueFalse = [true, false];
  return {
    name: `employee #${idx}`,
    email: `employee#${idx}@company.com`,
    phoneNumber: `+4612345678${idx}`,
    manager: `manager${(idx % 3) + 1}@company.com`,
    office: offices[getRandIdx(0, 5)],
    orgUnit: "/Employees",
    mainText: `<p>employee #${idx}'s main text</p>`,
    gitHub: `https://github.com/employee#${idx}`,
    twitter: `https://twitter.com/employee#${idx}`,
    stackOverflow: `https://stackoverflow.com/employee#${idx}`,
    linkedIn: `https://linkedin.com/employee#${idx}`,
    imagePortraitUrl: `https://i.company.com/profile/employee#${idx}`,
    imageWallOfLeetUrl: `https://i.company.com/wallofleet/employee#${idx}`,
    highlighted: trueFalse[getRandIdx(0, 1)],
    published: trueFalse[getRandIdx(0, 1)],
  };
});

console.log(newData.length);

fs.writeFileSync("./data/data.json", JSON.stringify(newData));
