roll = (d) => {
  return Math.floor(Math.random()*d)+1;
};

const bloodSummary = {
  "Blue": "a noble, born in the lap of privledge and power",
  "Crimson": "a pauper, born of violence and struggle",
  "Green": "an artisan, born to humble folk",
  "Silver": "a burgher, born to new wealth and new ideas",
  "Clear": "an outsider, raised outside of the conserns of social class"
}

const blood = generate_text("blood");
const bg = generate_text(blood+"-bg");
const description = generate_text('traits');
const bloodDesc = `You are ${blood}-blooded; ${bloodSummary[blood]}`
const intro = `You are <i> ${generate_text("name")} ${generate_text("surname")}</i>`
const background = `formerly ${generate_text(blood+"-bg")}`
const armor = generate_text("armor");
const helmet = generate_text("helmet");
const tool = generate_text("tool");
const gear = generate_text("gear");
const trinket = generate_text("trinket");
const weapons = generate_text("weapons");
const bonus = generate_text("bonus");

const deformities = [...new Set([
  generate_text("magical deformities"),
  generate_text("magical deformities"),
  generate_text("magical deformities"),
])].join(". ")

const character = `${intro}, ${background}. ${bloodDesc}. ${description}`;

let allItems = [];
allItems.push(armor, helmet, weapons, gear, tool, trinket, bonus);
let total = 2;
for (let i = 0; i < allItems.length; i++) {
  let item = allItems[i];
  if (item.includes("bulky") || item.includes("and a")) {
    total += 2;
  } else if (total > 10){
    total = 10;
  } else if (!item.includes("protection") && (!item.includes("nor") && (!item.includes("stacks")))) {
    total++;
  }
}

let armorTotal = 0;
let armorValue = [];
armorValue.push(armor, helmet);
armorValue.forEach((item) => {
  if (item.includes("1")) {
    armorTotal++;
  } if (armorTotal > 3){
      armorTotal = 3;
  } else if (item.includes("2")) {
    armorTotal += 2;
  } else if (item.includes("3")) {
    armorTotal += 3;
  }
});

console.log(total);
$("#character").html(character);
$("#deformities").html(deformities);
$("#age").html(roll(20) + roll(20) + 10);
$("#hp").html(roll(6));
["str", "dex", "wil"].forEach((item, i) => {
$("#" + item).html(roll(6) + roll(6) + roll(6));});
$("#armor").html(armor);
$("#helmet").html(helmet);
$("#weapons").html(weapons);
$("#tool").html(tool);
$("#gear").html(gear);
$("#trinket").html(trinket);
$("#bonus").html(bonus);
$("#armorTotal").html(armorTotal);
$("#total").html(total);
$("#gold").html(roll(6) + roll(6) + roll(6));
